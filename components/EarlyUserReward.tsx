import { useState, useLayoutEffect } from "react";
import {
  CardHeader,
  CardBody,
  Heading,
  Divider,
  CardFooter,
  Spinner,
} from "@chakra-ui/react";
import { QuestionIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";
import { tokenAmountFormat } from "lib/utils";
import { useContractContext } from "lib/contexts/ContractContext";
import StyledButton from "components/shared/StyledButton";
import StyledCard from "components/shared/StyledCard";
import StyledHStack from "components/shared/StyledHStack";
import StyledTooltip from "components/shared/StyledTooltip";
import useVestingAmounts from "hooks/Vesting/useVestingAmounts";
import useClaimedAmounts from "hooks/Vesting/useClaimedAmounts";

export default function EarlyUserReward({
  address,
}: {
  address?: `0x${string}`;
}) {
  const { t } = useTranslation();
  const { config } = useContractContext();

  const [claimableAmount, setClaimableAmount] = useState<bigint | undefined>(
    undefined,
  );

  const { data: vestingAmounts } = useVestingAmounts(address) as {
    data: bigint | undefined;
  };
  const { data: claimedAmounts } = useClaimedAmounts(address) as {
    data: bigint | undefined;
  };

  const now = Date.now();

  useLayoutEffect(() => {
    if (vestingAmounts !== undefined && claimedAmounts !== undefined) {
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
          Initial Reward
        </Heading>
      </CardHeader>
      <CardBody>
        <Heading fontSize={"xl"} pb={1}>
          {t("EARLY_USER_REWARD")}
          <StyledTooltip labelKey="EARLY_USER_REWARD_HELP">
            <QuestionIcon fontSize={"md"} mb={1} ml={1} />
          </StyledTooltip>
        </Heading>
        <Divider my={2} />
        <StyledHStack title={t("ALLOCATED")} unit={"YMT"}>
          {typeof vestingAmounts === "undefined" ? (
            <Spinner />
          ) : (
            <>{tokenAmountFormat(vestingAmounts, 18, 2)}</>
          )}
        </StyledHStack>
        <StyledHStack title={t("CLAIMED")} unit={"YMT"} mt={1}>
          {typeof claimedAmounts === "undefined" ? (
            <Spinner />
          ) : (
            <>{tokenAmountFormat(claimedAmounts, 18, 2)}</>
          )}
        </StyledHStack>
        <StyledHStack title={t("CLAIMABLE")} unit={"YMT"} mt={1}>
          {claimableAmount === undefined ? (
            <Spinner />
          ) : (
            <>{tokenAmountFormat(claimableAmount, config.TokenDecimals, 2)}</>
          )}
        </StyledHStack>
      </CardBody>
      <CardFooter pt={0} justifyContent={"flex-end"}>
        <StyledButton size={"sm"}>{t("CLAIM")}</StyledButton>
      </CardFooter>
    </StyledCard>
  );
}
