import { useToast } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import TxSentToast from "components/shared/TxSentToast";

const useToastNotifications = () => {
  const toast = useToast({ position: "top-right", isClosable: true });
  const { t } = useTranslation();

  const showSuccessToast = (data?: any) => {
    toast({
      title: t("TRANSACTION_SENT"),
      status: "success",
      duration: 5000,
      render: (props) => <TxSentToast txid={data} {...props} />,
    });
  };

  const showErrorToast = (errorMessage: string) => {
    toast({
      description: errorMessage,
      status: "error",
      duration: 5000,
    });
  };

  const showConfirmationToast = () => {
    toast({
      title: t("TRANSACTION_CONFIRMED"),
      status: "success",
      duration: 5000,
    });
  };

  return { showSuccessToast, showErrorToast, showConfirmationToast };
};

export default useToastNotifications;
