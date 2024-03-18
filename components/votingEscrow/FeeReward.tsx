import { HStack, Box, chakra, useToast } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import StyledButton from "components/shared/StyledButton";
import AmountRenderer from "components/shared/AmountRenderer";
import TxSentToast from "components/shared/TxSentToast";
import useClaim, { UseClaimReturn } from "hooks/FeeDistributor/useClaim";

export default function Reward({ address }: { address?: `0x${string}` }) {
  const { t } = useTranslation();
  const toast = useToast({ position: "top-right", isClosable: true });
  const { prepareFn, writeFn, waitFn, writeContract } = useClaim({
    callbacks: {
      onSuccessWrite(data) {
        toast({
          title: t("TRANSACTION_SENT"),
          status: "success",
          duration: 5000,
          render: (props) => <TxSentToast txid={data.hash} {...props} />,
        });
      },
      onError(e) {
        toast({
          description: e.message,
          status: "error",
          duration: 5000,
        });
      },
      onSuccessConfirm(data) {
        toast({
          title: t("TRANSACTION_CONFIRMED"),
          status: "success",
          duration: 5000,
        });
      },
    },
  }) as UseClaimReturn;
  const result = prepareFn.data?.result;

  return (
    <HStack spacing={2}>
      <Box fontSize={"2xl"}>
        <AmountRenderer amount={result} />
        <chakra.span fontSize={"lg"} ml={1}>
          {"ETH"}
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
