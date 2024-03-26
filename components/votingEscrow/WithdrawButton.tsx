import { ButtonProps } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useContractContext } from "lib/contexts/ContractContext";
import StyledButton from "components/shared/StyledButton";
import useWithdraw, { UseWithdrawReturn } from "hooks/VotingEscrow/useWithdraw";
import useToastNotifications from "hooks/useToastNotifications";

export default function WithdrawButton(props: ButtonProps) {
  const { t } = useTranslation();
  const { config, triggerRefetch } = useContractContext();
  const { tokenName } = config;
  const { showSuccessToast, showErrorToast, showConfirmationToast } = useToastNotifications();
  const { writeFn, waitFn, writeContract } = useWithdraw({
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
  }) as UseWithdrawReturn;

  return (
    <>
      <StyledButton
        variant={"solid"}
        size={"sm"}
        isDisabled={!writeFn.writeContract}
        isLoading={writeFn.isPending || waitFn.isLoading}
        onClick={() => writeContract()}
        {...props}
      >
        {t("VE_WITHDRAW", { tokenName })}
      </StyledButton>
    </>
  );
}
