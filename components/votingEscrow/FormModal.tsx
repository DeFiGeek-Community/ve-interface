import React, { useState, useEffect } from "react";
import {
  Button,
  HStack,
  Flex,
  chakra,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormLabel,
  FormControl,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  NumberInputStepper,
  NumberDecrementStepper,
  useColorMode,
  Grid,
  GridItem,
  Text,
  Box,
  Alert,
  AlertIcon,
  AlertDescription,
  VStack,
} from "@chakra-ui/react";
import { DatePicker, CustomProvider } from "rsuite";
import { useTranslation } from "react-i18next";
import { jaJP, enUS } from "rsuite/locales";
import "rsuite/dist/rsuite-no-reset.min.css";
import { tokenAmountFormat, formatTokenAmountToNumber } from "lib/utils";
import { LockType } from "lib/types/VotingEscrow";
import StyledButton from "components/shared/StyledButton";
import useBalanceOf from "hooks/Token/useBalanceOf";

type FormModalProps = {
  address?: `0x${string}`;
  type: string;
  isOpen: boolean;
  onClose: () => void;
};

const buttonOptions = [
  { label: "1 week", days: 7 },
  { label: "1 month", days: 30 },
  { label: "3 months", days: 90 },
  { label: "6 months", days: 180 },
  { label: "1 year", days: 365 },
  { label: "4 years", days: 1460 },
];

export default function FormModal({
  address,
  type,
  isOpen,
  onClose,
}: FormModalProps) {
  const { colorMode } = useColorMode();
  const { t, i18n } = useTranslation();
  const { data: balance } = useBalanceOf(address) as {
    data: bigint | undefined;
  };

  const [date, setDate] = useState<Date | null>(null);
  const [inputValue, setInputValue] = useState<number | null>(null);
  const [isDateError, setIsDateError] = useState<boolean>(false);
  const [isInputError, setIsInputError] = useState<boolean>(false);

  useEffect(() => {
    if (
      inputValue &&
      balance &&
      inputValue > formatTokenAmountToNumber(balance, 16)
    ) {
      setIsInputError(true);
    } else {
      setIsInputError(false);
    }
  }, [inputValue, balance]);

  const setDaysLater = (days: number) => {
    const newDate = new Date();
    newDate.setDate(newDate.getDate() + days);
    setDate(newDate);
  };

  useEffect(() => {
    const now = new Date();
    const fourYearsLater = new Date();
    fourYearsLater.setFullYear(now.getFullYear() + 4);

    if (date && date > fourYearsLater) {
      setIsDateError(true);
    } else {
      setIsDateError(false);
    }
  }, [date]);

  return (
    <>
      <CustomProvider
        theme={colorMode}
        locale={i18n.language === "ja" ? jaJP : enUS}
      >
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
              {type === LockType.CREATE_LOCK && t("VE_CREATE_LOCK")}
              {type === LockType.INCREASE_AMOUNT && t("VE_INCREASE_AMOUNT")}
              {type === LockType.INCREASE_UNLOCK_TIME &&
                t("VE_INCREASE_UNLOCK_TIME")}
              <ModalCloseButton mt={1} mr={1} />
            </ModalHeader>

            <ModalBody pb={6} pt={0}>
              <form>
                {type !== LockType.INCREASE_UNLOCK_TIME && (
                  <HStack spacing={8} alignItems={"start"}>
                    <Box w={"full"}>
                      <FormControl mt={4}>
                        <Flex justifyContent={"space-between"}>
                          <FormLabel alignItems={"baseline"} fontWeight={"600"}>
                            {t("INPUT_LOCK_AMOUNT")}{" "}
                          </FormLabel>
                        </Flex>

                        <Flex alignItems={"center"}>
                          <NumberInput
                            flex="1"
                            name="value"
                            min={0}
                            // max={Number.MAX_SAFE_INTEGER}
                            value={inputValue || undefined}
                            onChange={(valueString) =>
                              setInputValue(Number(valueString))
                            }
                          >
                            <NumberInputField />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                          <Box px={2} minW={"3rem"}>
                            YMT
                          </Box>
                        </Flex>
                        {isInputError && (
                          <Alert fontSize="14px" status="error" mt={2}>
                            <AlertIcon boxSize="15px" />
                            <AlertDescription>
                              {t("INPUT_EXCEEDS_BALANCE")}
                            </AlertDescription>
                          </Alert>
                        )}
                        <Box>
                          <Text
                            fontSize={"sm"}
                            cursor="pointer"
                            onClick={() =>
                              setInputValue(
                                formatTokenAmountToNumber(
                                  balance || BigInt(0),
                                  16,
                                ),
                              )
                            }
                          >
                            {t("BALANCE")}:{" "}
                            {typeof balance === "undefined" ? (
                              "..."
                            ) : (
                              <>{tokenAmountFormat(balance, 18, 2)}</>
                            )}{" "}
                            YMT
                          </Text>
                        </Box>
                      </FormControl>
                    </Box>
                  </HStack>
                )}

                {type !== LockType.INCREASE_AMOUNT && (
                  <FormControl mt={4}>
                    <FormLabel alignItems={"baseline"} fontWeight={"600"}>
                      {t("SELECT_UNLOCK_DATE")}
                    </FormLabel>
                    <Flex alignItems={"center"}>
                      <Box>
                        <DatePicker
                          oneTap={true}
                          format="yyyy-MM-dd"
                          placement="topStart"
                          cleanable={false}
                          defaultValue={null}
                          value={date}
                          onChange={setDate}
                        />
                      </Box>
                      <chakra.span fontSize={"sm"} ml={2}>
                        (UTC)
                      </chakra.span>
                    </Flex>
                    {isDateError && (
                      <Alert fontSize="14px" status="error" mt={2}>
                        <AlertIcon boxSize="15px" />
                        <AlertDescription>
                          {t("UNABLE_TO_LOCK_DATE")}
                        </AlertDescription>
                      </Alert>
                    )}
                    <Grid
                      mt={2}
                      templateRows="repeat(2, 1fr)"
                      templateColumns="repeat(3, 1fr)"
                      gap={2}
                    >
                      {buttonOptions.map((option) => (
                        <GridItem key={option.label}>
                          <Button
                            size="sm"
                            w="full"
                            color="#818181"
                            onClick={() => setDaysLater(option.days)}
                          >
                            {option.label}
                          </Button>
                        </GridItem>
                      ))}
                    </Grid>
                  </FormControl>
                )}
                <HStack mt={6}>
                  <Alert
                    status="info"
                    fontSize="14px"
                    bg={"#fad9d6"}
                    color={"#818181"}
                  >
                    <AlertIcon boxSize="15px" color="#818181" />
                    <VStack spacing={2}>
                      <AlertDescription>{t("YMT_LOCK_NOTE")}</AlertDescription>
                      <AlertDescription>
                        {t("VE_YMT_DECREASE_NOTE")}
                      </AlertDescription>
                    </VStack>
                  </Alert>
                </HStack>

                <StyledButton
                  mt={4}
                  w={"full"}
                  variant="solid"
                  isDisabled={isDateError || isInputError}
                >
                  {t("VE_CREATE_LOCK")}
                </StyledButton>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      </CustomProvider>
    </>
  );
}
