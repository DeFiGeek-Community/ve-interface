import { useEffect } from "react";
import {
  HStack,
  VStack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Alert,
  AlertIcon,
  AlertDescription,
  useToast,
} from "@chakra-ui/react";
import { QuestionIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";
import { useContractContext } from "lib/contexts/ContractContext";
import StyledButton from "components/shared/StyledButton";
import StyledTooltip from "components/shared/StyledTooltip";
import TxSentToast from "components/shared/TxSentToast";
import useUserCheckpoint, {
  UseUserCheckpointReturn,
} from "hooks/Gauge/useUserCheckpoint";
import useIntegrateFraction from "hooks/Gauge/useIntegrateFraction";
import usePledge from "hooks/Yamato/usePledge";

export default function InitialCheckpoint({
  address,
}: {
  address?: `0x${string}`;
}) {
  const { t } = useTranslation();
  const { triggerRefetch } = useContractContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast({ position: "top-right", isClosable: true });

  const { data: integrateFraction } = useIntegrateFraction(address) as {
    data: bigint | undefined;
  };
  const { data: pledgeData } = usePledge(address);
  const pledge = pledgeData as
    | {
        coll: bigint;
        debt: bigint;
        isCreated: boolean;
        owner: string;
        priority: bigint;
      }
    | undefined;

  useEffect(() => {
    if (integrateFraction === BigInt(0) && pledge && pledge.debt >= BigInt(0)) {
      onOpen();
    }
  }, [integrateFraction, pledge]);

  const { writeFn, waitFn, writeContract } = useUserCheckpoint({
    callbacks: {
      onSuccessWrite(data) {
        toast({
          title: t("TRANSACTION_SENT"),
          status: "success",
          duration: 5000,
          render: (props) => <TxSentToast txid={data} {...props} />,
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
        triggerRefetch();
      },
    },
  }) as UseUserCheckpointReturn;

  return (
    <>
      <HStack justifyContent={"space-between"} alignItems={"baseline"} mt={4}>
        <Text>
          {t("CHECKPOINT_TITLE")}
          <StyledTooltip
            labelText={`${t("CHECKPOINT_DESCRIPTION")}${t("CHECKPOINT_ALERT")}`}
          >
            <QuestionIcon fontSize={"md"} mb={1} ml={1} />
          </StyledTooltip>
        </Text>
        <StyledButton variant={"solid"} size={"sm"} onClick={() => onOpen()}>
          {t("UPDATE_SCORE_BUTTON")}
        </StyledButton>
      </HStack>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        blockScrollOnMount={false}
        isCentered={true}
        size={"md"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {t("CHECKPOINT_TITLE")}
            <ModalCloseButton mt={1} mr={1} />
          </ModalHeader>
          <ModalBody pb={6} pt={0}>
            <Text>{t("CHECKPOINT_DESCRIPTION")}</Text>
            <HStack mt={6}>
              <Alert
                status="info"
                fontSize="14px"
                bg={"#fad9d6"}
                color={"#818181"}
              >
                <AlertIcon boxSize="15px" color="#818181" />
                <VStack spacing={2}>
                  <AlertDescription>{t("CHECKPOINT_ALERT")}</AlertDescription>
                </VStack>
              </Alert>
            </HStack>
            <StyledButton
              mt={4}
              w={"full"}
              variant="solid"
              isDisabled={!address || !writeFn.writeContract}
              isLoading={writeFn.isPending || waitFn.isLoading}
              onClick={() => writeContract()}
            >
              {t("CHECKPOINT_BUTTON")}
            </StyledButton>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
