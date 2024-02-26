import { HStack, Text, chakra, Spinner } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import NewLockForm from "./NewLockForm";
import IncreaseUnlockTimeForm from "./IncreaseUnlockTimeForm";
import IncreaseAmountForm from "./IncreaseAmountForm";

export default function LockStats({ address }: { address?: `0x${string}` }) {
  const { t } = useTranslation();

  return (
    <>
      <HStack justifyContent={"space-between"}>
        <chakra.p>{t("BALANCE")}</chakra.p>
        <chakra.p fontSize={"2xl"}>
          <>{"0.0"}</>
          <chakra.span fontSize={"lg"} ml={1}>
            veYMT
          </chakra.span>
        </chakra.p>
      </HStack>
      <HStack justifyContent={"space-between"} mt={1}>
        <chakra.p>{t("YMT_LOCKED")}</chakra.p>
        <chakra.p fontSize={"2xl"}>
          <>{"0.0"}</>
          <chakra.span fontSize={"lg"} ml={1}>
            YMT
          </chakra.span>
        </chakra.p>
      </HStack>
      <HStack justifyContent={"space-between"} mt={1}>
        <chakra.p>{t("LOCKED_UNTIL")}</chakra.p>
        <chakra.p fontSize={"2xl"}>{"-- / -- / --"}</chakra.p>
      </HStack>

      <HStack spacing={4} justifyContent={"flex-end"} mt={2}>
        <NewLockForm address={address} />
        <IncreaseUnlockTimeForm address={address}/>
        <IncreaseAmountForm address={address}/>
      </HStack>
    </>
  );
}
