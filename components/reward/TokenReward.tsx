import { Box, HStack, chakra } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useContractContext } from "lib/contexts/ContractContext";
import StyledButton from "components/shared/StyledButton";
import AmountRenderer from "components/shared/AmountRenderer";
import useClaim from "hooks/FeeDistributor/useClaim";
import useToastNotifications from "hooks/useToastNotifications";

interface TokenRewardProps {
  token: string;
  tokenAddress?: `0x${string}` | undefined;
}

export default function TokenReward({ token, tokenAddress }: TokenRewardProps) {
  const { t } = useTranslation();
  const { config, triggerRefetch } = useContractContext();
  const { showSuccessToast, showErrorToast, showConfirmationToast } =
    useToastNotifications();
  const { prepareFn, writeFn, waitFn, writeContract } = useClaim({
    tokenAddress,
    callbacks: {
      onSuccessWrite(data) {
        showSuccessToast(data);
      },
      onError(e) {
        showErrorToast(e.message);
      },
      onSuccessConfirm(data) {
        showConfirmationToast();
        triggerRefetch();
      },
    },
  });
  const result = prepareFn.data?.result;

  return (
    <HStack spacing={2} alignItems="center">
      <Box key={token} fontSize={"2xl"}>
        <AmountRenderer amount={tokenAddress ? result : BigInt(0)} />
        <chakra.span fontSize={"lg"} ml={1}>
          {token}
        </chakra.span>
      </Box>
      <StyledButton
        variant={"solid"}
        size={"sm"}
        isDisabled={!result || !writeFn.writeContract}
        isLoading={writeFn.isPending || waitFn.isLoading}
        onClick={() => writeContract()}
      >
        {t("CLAIM")}
      </StyledButton>
    </HStack>
  );
}
