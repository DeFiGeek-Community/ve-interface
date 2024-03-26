import { useState, useEffect } from "react";
import {
  CardHeader,
  CardBody,
  Heading,
  Divider,
  CardFooter,
} from "@chakra-ui/react";
import { QuestionIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";
import { useContractContext } from "lib/contexts/ContractContext";
import StyledButton from "components/shared/StyledButton";
import StyledCard from "components/shared/StyledCard";
import StyledHStack from "components/shared/StyledHStack";
import StyledTooltip from "components/shared/StyledTooltip";
import AmountRenderer from "components/shared/AmountRenderer";
import useVestingAmounts from "hooks/Vesting/useVestingAmounts";
import useClaimedAmounts from "hooks/Vesting/useClaimedAmounts";
import useClaimRewards, {
  UseClaimRewardsReturn,
} from "hooks/Vesting/useClaimRewards";
import useToastNotifications from "hooks/useToastNotifications";

export default function InitialReward({
  address,
}: {
  address?: `0x${string}`;
}) {
  const { t } = useTranslation();
  const { config, triggerRefetch } = useContractContext();
  const { tokenName } = config;

  const { showSuccessToast, showErrorToast, showConfirmationToast } =
    useToastNotifications();

  const [claimableAmount, setClaimableAmount] = useState<bigint | undefined>(
    undefined,
  );

  const { data: vestingAmounts } = useVestingAmounts(address) as {
    data: bigint | undefined;
  };
  const { data: claimedAmounts } = useClaimedAmounts(address) as {
    data: bigint | undefined;
  };

  const { writeFn, waitFn, writeContract } = useClaimRewards({
    callbacks: {
      onSuccessWrite(data) {
        showSuccessToast(data);
      },
      onError(e) {
        showErrorToast(e.message);
      },
      onSuccessConfirm(data) {
        showConfirmationToast();
        triggerRefetch();
      },
    },
  }) as UseClaimRewardsReturn;

  useEffect(() => {
    if (
      vestingAmounts !== undefined &&
      claimedAmounts !== undefined &&
      config
    ) {
      const now = Date.now();
      const distributionStart = config.TokenStartTimestamp;
      const timeElapsed = now / 1000 - distributionStart;
      const period = config.VestingPeriod;
      let calculatedClaimableAmount;
      if (now / 1000 >= distributionStart + period) {
        calculatedClaimableAmount = vestingAmounts;
      } else {
        const timeElapsedBigInt = BigInt(Math.floor(timeElapsed));
        const vestingAmountsPerPeriod = vestingAmounts / BigInt(period);
        calculatedClaimableAmount =
          timeElapsedBigInt *
          BigInt(Math.floor(Number(vestingAmountsPerPeriod)));
      }
      const availableToClaim = calculatedClaimableAmount - claimedAmounts;
      setClaimableAmount(availableToClaim);
    }
  }, [vestingAmounts, claimedAmounts, config]);

  return (
    <StyledCard>
      <CardHeader bg={"#f9aea5"} py={2}>
        <Heading size="md" color={"white"}>
          {t("INITIAL_REWARD", { tokenName })}
        </Heading>
      </CardHeader>
      <CardBody>
        <Heading fontSize={"xl"} pb={1}>
          {t("EARLY_USER_REWARD")}
          <StyledTooltip labelText={t("EARLY_USER_REWARD_HELP")}>
            <QuestionIcon fontSize={"md"} mb={1} ml={1} />
          </StyledTooltip>
        </Heading>
        <Divider my={2} />
        <StyledHStack title={t("ALLOCATED")} unit={tokenName}>
          <AmountRenderer amount={vestingAmounts} />
        </StyledHStack>
        <StyledHStack title={t("CLAIMED")} unit={tokenName} mt={1}>
          <AmountRenderer amount={claimedAmounts} />
        </StyledHStack>
        <StyledHStack title={t("CLAIMABLE")} unit={tokenName} mt={1}>
          <AmountRenderer amount={claimableAmount} />
        </StyledHStack>
      </CardBody>
      <CardFooter pt={0} justifyContent={"flex-end"}>
        <StyledButton
          size={"sm"}
          isDisabled={!claimableAmount || !writeFn.writeContract}
          isLoading={writeFn.isPending || waitFn.isLoading}
          onClick={() => writeContract()}
        >
          {t("CLAIM")}
        </StyledButton>
      </CardFooter>
    </StyledCard>
  );
}
