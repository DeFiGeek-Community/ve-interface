import { ButtonProps, useDisclosure } from "@chakra-ui/react";
import { LockType } from "lib/types/VotingEscrow";
import { useTranslation } from "react-i18next";
import FormModal from "./FormModal";
import StyledButton from "components/shared/StyledButton";

export default function NewLockForm({
  address,
  ...props
}: { address?: `0x${string}` } & ButtonProps) {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <StyledButton variant={"solid"} size={"sm"} onClick={onOpen} {...props}>
        {t("VE_CREATE_LOCK")}
      </StyledButton>
      {isOpen && (
        <FormModal
          address={address}
          type={LockType.CREATE_LOCK}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </>
  );
}
