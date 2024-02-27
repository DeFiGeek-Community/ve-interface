import { ButtonProps } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { CustomButton } from "components/shared/CustomButton";

export default function WithdrawButton(props: ButtonProps) {
  const { t } = useTranslation();
  return (
    <>
      <CustomButton
        variant={"solid"}
        colorScheme="green"
        size={"sm"}
        {...props}
      >
        {t("VE_WITHDRAW")}
      </CustomButton>
    </>
  );
}
