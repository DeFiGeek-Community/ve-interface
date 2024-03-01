import { ButtonProps } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import StyledButton from "components/shared/StyledButton";

export default function WithdrawButton(props: ButtonProps) {
  const { t } = useTranslation();
  return (
    <>
      <StyledButton variant={"solid"} size={"sm"} {...props}>
        {t("VE_WITHDRAW")}
      </StyledButton>
    </>
  );
}
