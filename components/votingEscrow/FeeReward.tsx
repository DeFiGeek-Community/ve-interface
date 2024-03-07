import { HStack, Box, chakra, Spinner, useToast } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { tokenAmountFormat } from "lib/utils";
import StyledButton from "components/shared/StyledButton";
import useClaim from "hooks/FeeDistributor/useClaim";

type PrepareFnData = {
  request: any;
  result?: bigint;
};

export default function Reward({ address }: { address?: `0x${string}` }) {
  const { t } = useTranslation();
  const toast = useToast({ position: "top-right", isClosable: true });
  const { prepareFn, writeFn, waitFn } = useClaim({
    address,
    onSuccessWrite(data) {
      toast({
        title: t("TRANSACTION_SENT"),
        status: "success",
        duration: 5000,
        // render: (props) => <TxSentToast txid={data.hash} {...props} />,
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
  }) as {
    prepareFn: { data: PrepareFnData | null };
    writeFn: any;
    waitFn: any;
  };

  return (
    <HStack spacing={2}>
      <Box fontSize={"2xl"}>
        {typeof prepareFn.data === "undefined" && <Spinner />}
        {!!prepareFn.data && typeof prepareFn.data.result === "bigint" && (
          <>{tokenAmountFormat(prepareFn.data.result, 18, 2)}</>
        )}
        <chakra.span fontSize={"lg"} ml={1}>
          {"ETH"}
        </chakra.span>
      </Box>
      <StyledButton
        variant={"solid"}
        size={"sm"}
        isDisabled={!prepareFn.data || !writeFn.writeContract}
        isLoading={writeFn.isPending || waitFn.isLoading}
        onClick={() => writeFn.writeContract!(prepareFn.data!.request)}
      >
        {t("CLAIM")}
      </StyledButton>
    </HStack>
  );
}
