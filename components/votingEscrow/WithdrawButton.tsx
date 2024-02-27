import { ButtonProps } from "@chakra-ui/react";
import { CustomButton } from "components/shared/CustomButton";

export default function WithdrawButton(props: ButtonProps) {
  return (
    <>
      <CustomButton
        variant={"solid"}
        colorScheme="green"
        size={"sm"}
        // isDisabled={true}
        {...props}
      >
        YMT引き出し
      </CustomButton>
    </>
  );
}
