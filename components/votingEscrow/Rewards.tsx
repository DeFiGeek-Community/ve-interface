import { HStack, VStack, Text, chakra, useToast, Box } from "@chakra-ui/react";
import { QuestionIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";
import FeeRewards from "components/votingEscrow/FeeReward";
import StyledButton from "components/shared/StyledButton";
import StyledTooltip from "components/shared/StyledTooltip";
import AmountRenderer from "components/shared/AmountRenderer";
import TxSentToast from "components/shared/TxSentToast";
import useMint, { UseMintReturn } from "hooks/Minter/useMint";

interface MintData {
  request?: any;
  result?: bigint;
}

export default function Reward({ address }: { address?: `0x${string}` }) {
  const { t } = useTranslation();
  const toast = useToast({ position: "top-right", isClosable: true });
  const { prepareFn, writeFn, waitFn, writeContract } = useMint({
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
  }) as UseMintReturn;

  const result = prepareFn.data?.result;
  return (
    <>
      <HStack justifyContent={"space-between"} alignItems={"baseline"} mt={4}>
        <Text>
          {t("REWARDS")}
          <StyledTooltip labelKey="REWARDS_HELP">
            <QuestionIcon fontSize={"md"} mb={1} ml={1} />
          </StyledTooltip>
        </Text>
        <VStack spacing={4} alignItems={"end"}>
          <HStack spacing={2}>
            <Box fontSize={"2xl"}>
              <AmountRenderer amount={result} />
              <chakra.span fontSize={"lg"} ml={1}>
                YMT
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
          <FeeRewards address={address} />
        </VStack>
      </HStack>
    </>
  );
}
