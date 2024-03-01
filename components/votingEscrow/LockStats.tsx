import { HStack, Spinner } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { tokenAmountFormat } from "lib/utils";
import NewLockForm from "./NewLockForm";
import IncreaseUnlockTimeForm from "./IncreaseUnlockTimeForm";
import IncreaseAmountForm from "./IncreaseAmountForm";
import WithdrawButton from "./WithdrawButton";
import StyledHStack from "components/shared/StyledHStack";
import useBalanceOf from "hooks/VotingEscrow/useBalanceOf";
import useLocked from "hooks/VotingEscrow/useLocked";

export default function LockStats({ address }: { address?: `0x${string}` }) {
  const { t } = useTranslation();
  const { data: balance } = useBalanceOf(address) as {
    data: bigint | undefined;
  };
  const { data: locked } = useLocked(address) as { data: bigint[] | undefined };
  return (
    <>
      <StyledHStack title={t("BALANCE")} unit={"veYMT"}>
        {typeof balance === "undefined" ? (
          <Spinner />
        ) : (
          <>{tokenAmountFormat(balance, 18, 2)}</>
        )}
      </StyledHStack>
      <StyledHStack title={t("YMT_LOCKED")} unit={"YMT"} mt={1}>
        {typeof locked === "undefined" ? (
          <Spinner />
        ) : (
          <>{tokenAmountFormat(locked[0], 18, 2)}</>
        )}
      </StyledHStack>
      <StyledHStack title={t("LOCKED_UNTIL")} unit={""} mt={1}>
        {typeof locked === "undefined" ? (
          <Spinner />
        ) : locked[1] === BigInt(0) ? (
          <>{"-- / -- / --"}</>
        ) : (
          <>{format(new Date(Number(locked[1]) * 1000), "yyyy / MM / dd")}</>
        )}
      </StyledHStack>
      <HStack spacing={4} justifyContent={"flex-end"} mt={2}>
        {!!locked && locked[1] === BigInt(0) && (
          <NewLockForm address={address} />
        )}
        {!!locked &&
          locked[1] !== BigInt(0) &&
          Number(locked[1]) > new Date().getTime() / 1000 && (
            <>
              <IncreaseAmountForm address={address} />
              <IncreaseUnlockTimeForm address={address} />
            </>
          )}
      </HStack>
      {!!locked &&
        locked[1] !== BigInt(0) &&
        Number(locked[1]) <= new Date().getTime() / 1000 && (
          <HStack spacing={4} justifyContent={"flex-end"} mt={4}>
            <WithdrawButton />
          </HStack>
        )}
    </>
  );
}
