import { useState, useEffect } from "react";
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
} from "@chakra-ui/react";
import { QuestionIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";
import { useContractContext } from "lib/contexts/ContractContext";
import StyledButton from "components/shared/StyledButton";
import StyledTooltip from "components/shared/StyledTooltip";
import useUserCheckpoint, {
  UseUserCheckpointReturn,
} from "hooks/Gauge/useUserCheckpoint";
import useWorkingBalances from "hooks/Gauge/useWorkingBalances";
import usePledge from "hooks/Yamato/usePledge";
import useToastNotifications from "hooks/useToastNotifications";

export default function InitialCheckpoint({
  address,
}: {
  address?: `0x${string}`;
}) {
  const { t } = useTranslation();
  const { triggerRefetch } = useContractContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { showSuccessToast, showErrorToast, showConfirmationToast } =
    useToastNotifications();

  const { data: workingBalances, isLoading: workingLoading } =
  useWorkingBalances(address) as {
      data: bigint | undefined;
      isLoading: boolean;
    };
  const { data: pledgeData, isLoading: pledgeLoading } = usePledge(address);
  const pledge = pledgeData as
    | {
        coll: bigint;
        debt: bigint;
        isCreated: boolean;
        owner: string;
        priority: bigint;
      }
    | undefined;

  const { writeFn, waitFn, writeContract } = useUserCheckpoint({
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
  }) as UseUserCheckpointReturn;

  const [shouldDisplay, setShouldDisplay] = useState(false);

  useEffect(() => {
    const isDataLoaded = !pledgeLoading && !workingLoading;
    const shouldOpenModal =
      workingBalances === BigInt(0) && pledge && pledge.debt > BigInt(0);
    if (isDataLoaded) {
      if (shouldOpenModal) {
        onOpen();
        setShouldDisplay(true);
      } else {
        setShouldDisplay(false);
      }
    }
  }, [workingBalances, pledge, pledgeLoading, workingLoading, onOpen]);

  if (!shouldDisplay) {
    return null;
  }

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
