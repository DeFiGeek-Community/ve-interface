import { HStack, Box, chakra, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useContractContext } from "lib/contexts/ContractContext";
import StyledButton from "components/shared/StyledButton";
import AmountRenderer from "components/shared/AmountRenderer";
import { QuestionIcon } from "@chakra-ui/icons";
import useClaim, { UseClaimReturn } from "hooks/FeeDistributor/useClaim";
import useToastNotifications from "hooks/useToastNotifications";
import StyledTooltip from "components/shared/StyledTooltip";

export default function FeeReward({ address }: { address?: `0x${string}` }) {
  const { t } = useTranslation();
  const { config, triggerRefetch } = useContractContext();
  const { tokenName, veTokenName } = config;
  const { showSuccessToast, showErrorToast, showConfirmationToast } =
    useToastNotifications();
  const { prepareFn, writeFn, waitFn, writeContract } = useClaim({
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
  }) as UseClaimReturn;
  const result = prepareFn.data?.result;

  return (
    <HStack justifyContent={"space-between"} alignItems={"baseline"} mt={4}>
      <Text>
        {`Fee${t("REWARDS")}`}
        <StyledTooltip
          labelText={t("FEE_REWARDS_HELP", { tokenName, veTokenName })}
        >
          <QuestionIcon fontSize={"md"} mb={1} ml={1} />
        </StyledTooltip>
      </Text>
      <HStack spacing={2}>
        <Box fontSize={"2xl"}>
          <AmountRenderer amount={result} precision={6} />
          <chakra.span fontSize={"lg"} ml={1}>
            {"ETH"}
          </chakra.span>
        </Box>
        <StyledButton
          variant={"solid"}
          size={"sm"}
          isDisabled={!result || !writeFn.writeContract}
          isLoading={writeFn.isPending || waitFn.isLoading}
          onClick={() => writeContract()}
        >
          {t("CLAIM")}
        </StyledButton>
      </HStack>
    </HStack>
  );
}
