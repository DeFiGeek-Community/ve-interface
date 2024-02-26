import { ButtonProps, Button, useDisclosure } from "@chakra-ui/react";
import { LockType } from "lib/types/VotingEscrow";
import { useTranslation } from "react-i18next";
import FormModal from "./FormModal";
import { CustomButton } from "components/shared/CustomButton";

export default function IncreaseUnlockTimeForm({
  address,
  ...props
}: { address?: `0x${string}` } & ButtonProps) {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <CustomButton
        variant={"solid"}
        size={"sm"}
        onClick={onOpen}
        {...props}
      >
        {t("VE_INCREASE_UNLOCK_TIME")}
      </CustomButton>
      {isOpen && (
        <FormModal
          address={address}
          type={LockType.INCREASE_UNLOCK_TIME}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </>
  );
}
