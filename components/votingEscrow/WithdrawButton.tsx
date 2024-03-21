import { ButtonProps, useToast } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useContractContext } from "lib/contexts/ContractContext";
import StyledButton from "components/shared/StyledButton";
import TxSentToast from "components/shared/TxSentToast";
import useWithdraw, { UseWithdrawReturn } from "hooks/VotingEscrow/useWithdraw";

export default function WithdrawButton(props: ButtonProps) {
  const { t } = useTranslation();
  const { triggerRefetch } = useContractContext();
  const toast = useToast({ position: "top-right", isClosable: true });
  const { writeFn, waitFn, writeContract } = useWithdraw({
    callbacks: {
      onSuccessWrite(data) {
        toast({
          title: t("TRANSACTION_SENT"),
          status: "success",
          duration: 5000,
          render: (props) => <TxSentToast txid={data.hash} {...props} />,
        });
      },
      onError(e) {
        toast({
          description: e.message,
          status: "error",
          duration: 5000,
        });
      },
      onSuccessConfirm(data) {
        toast({
          title: t("TRANSACTION_CONFIRMED"),
          status: "success",
          duration: 5000,
        });
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
        {t("VE_WITHDRAW")}
      </StyledButton>
    </>
  );
}
