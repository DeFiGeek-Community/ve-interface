import { HStack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import NewLockForm from "./NewLockForm";
import IncreaseUnlockTimeForm from "./IncreaseUnlockTimeForm";
import IncreaseAmountForm from "./IncreaseAmountForm";
import WithdrawButton from "./WithdrawButton";
import StyledHStack from "components/shared/StyledHStack";

export default function LockStats({ address }: { address?: `0x${string}` }) {
  const { t } = useTranslation();

  return (
    <>
      <StyledHStack title={t("BALANCE")} value={"0.0"} unit={"veYMT"} />
      <StyledHStack title={t("YMT_LOCKED")} value={"0.0"} unit={"YMT"} mt={1} />
      <StyledHStack
        title={t("LOCKED_UNTIL")}
        value={"-- / -- / --"}
        unit={""}
        mt={1}
      />

      <HStack spacing={4} justifyContent={"flex-end"} mt={2}>
        <NewLockForm address={address} />
        <IncreaseUnlockTimeForm address={address} />
        <IncreaseAmountForm address={address} />
      </HStack>
      <HStack spacing={4} justifyContent={"flex-end"} mt={4}>
        <WithdrawButton />
      </HStack>
    </>
  );
}
