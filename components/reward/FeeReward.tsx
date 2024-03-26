import { HStack, Box, chakra } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useContractContext } from "lib/contexts/ContractContext";
import StyledButton from "components/shared/StyledButton";
import AmountRenderer from "components/shared/AmountRenderer";
import useClaim, { UseClaimReturn } from "hooks/FeeDistributor/useClaim";
import useToastNotifications from "hooks/useToastNotifications";

export default function Reward({ address }: { address?: `0x${string}` }) {
  const { t } = useTranslation();
  const { triggerRefetch } = useContractContext();
  const { showSuccessToast, showErrorToast, showConfirmationToast } = useToastNotifications();
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
    <HStack spacing={2}>
      <Box fontSize={"2xl"}>
        <AmountRenderer amount={result} />
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
  );
}
