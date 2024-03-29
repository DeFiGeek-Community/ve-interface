import { HStack, VStack, Text, chakra, Box } from "@chakra-ui/react";
import { QuestionIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";
import { useContractContext } from "lib/contexts/ContractContext";
import StyledButton from "components/shared/StyledButton";
import StyledTooltip from "components/shared/StyledTooltip";
import AmountRenderer from "components/shared/AmountRenderer";
import useMint, { UseMintReturn } from "hooks/Minter/useMint";
import useToastNotifications from "hooks/useToastNotifications";

export default function Reward({ address }: { address?: `0x${string}` }) {
  const { t } = useTranslation();
  const { config, triggerRefetch } = useContractContext();
  const { tokenName, veTokenName } = config;
  const { showSuccessToast, showErrorToast, showConfirmationToast } =
    useToastNotifications();

  const { prepareFn, writeFn, waitFn, writeContract } = useMint({
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
  }) as UseMintReturn;

  const result = prepareFn.data?.result;
  return (
    <HStack justifyContent={"space-between"} alignItems={"baseline"} mt={4}>
      <Text>
        {`${tokenName}${t("REWARDS")}`}
        <StyledTooltip
          labelText={t("REWARDS_HELP", { tokenName, veTokenName })}
        >
          <QuestionIcon fontSize={"md"} mb={1} ml={1} />
        </StyledTooltip>
      </Text>
      <HStack spacing={2}>
        <Box fontSize={"2xl"}>
          <AmountRenderer amount={result} />
          <chakra.span fontSize={"lg"} ml={1}>
            {tokenName}
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
