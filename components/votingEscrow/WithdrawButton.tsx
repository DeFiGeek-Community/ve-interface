import { ButtonProps, useToast } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import StyledButton from "components/shared/StyledButton";
import useWithdraw from "hooks/VotingEscrow/useWithdraw";

interface WithdrawData {
  request?: any;
  result?: bigint;
}

export default function WithdrawButton(props: ButtonProps) {
  const { t } = useTranslation();
  const toast = useToast({ position: "top-right", isClosable: true });
  const { prepareFn, writeFn, waitFn } = useWithdraw({
    onSuccessWrite(data) {
      toast({
        title: t("TRANSACTION_SENT"),
        status: "success",
        duration: 5000,
        // render: (props) => <TxSentToast txid={data.hash} {...props} />,
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
    },
  });

  const withdrawData = prepareFn.data as WithdrawData;

  return (
    <>
      <StyledButton
        variant={"solid"}
        size={"sm"}
        isDisabled={!writeFn.writeContract}
        isLoading={writeFn.isPending || waitFn.isLoading}
        onClick={() => writeFn.writeContract!(withdrawData!.request)}
        {...props}
      >
        {t("VE_WITHDRAW")}
      </StyledButton>
    </>
  );
}
