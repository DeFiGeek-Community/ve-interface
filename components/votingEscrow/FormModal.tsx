import React from "react";
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
  FormErrorMessage,
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
import { useFormik } from "formik";
import { DatePicker, CustomProvider } from "rsuite";
import { format, addYears, addDays } from "date-fns";
import { useTranslation } from "react-i18next";
import { jaJP, enUS } from "rsuite/locales";
import "rsuite/dist/rsuite-no-reset.min.css";
import {
  tokenAmountFormat,
  formatTokenAmountToNumber,
  convertToBigIntWithDecimals,
  getRoundedWeekTimestamp,
} from "lib/utils";
import { LockType } from "lib/types/VotingEscrow";
import { useContractContext } from "lib/contexts/ContractContext";
import StyledButton from "components/shared/StyledButton";
import useBalanceOf from "hooks/Token/useBalanceOf";
import useApprove, { UseApproveReturn } from "hooks/Token/useApprove";
import useLock, { UseLockReturn } from "hooks/VotingEscrow/useLock";
import useToastNotifications from "hooks/useToastNotifications";

type FormModalProps = {
  address?: `0x${string}`;
  type: string;
  isOpen: boolean;
  onClose: () => void;
};

type LockFormValues = {
  value: number;
  unlockTime: number | null;
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
  const { config, triggerRefetch } = useContractContext();
  const { tokenName, veTokenName } = config;
  const decimals = config.TokenDecimals;
  const themeColors = config.themeColors;
  const { showSuccessToast, showErrorToast, showConfirmationToast } =
    useToastNotifications();

  const { data: balance } = useBalanceOf(address) as {
    data: bigint | undefined;
  };

  const setDaysLater = (days: number) => {
    const newDate = addDays(new Date(), days);
    formikProps.setFieldValue("unlockTime", getRoundedWeekTimestamp(newDate));
  };

  const isApprove =
    type === LockType.CREATE_LOCK || type === LockType.INCREASE_AMOUNT;

  const initData: LockFormValues = {
    value: 0,
    unlockTime: null,
  };

  const validateLockForm = (value: LockFormValues) => {
    const errors: any = {};

    const isCreatingOrIncreasingAmount =
      type === LockType.CREATE_LOCK || type === LockType.INCREASE_AMOUNT;
    const isCreatingOrIncreasingUnlockTime =
      type === LockType.CREATE_LOCK || type === LockType.INCREASE_UNLOCK_TIME;

    if (isCreatingOrIncreasingAmount) {
      if (
        typeof balance === "bigint" &&
        balance < convertToBigIntWithDecimals(value.value, decimals)
      ) {
        errors.value = `Not enough balance`;
      } else if (value.value <= 0) {
        errors.value = `Value must be greater than 0`;
      }
    }

    if (isCreatingOrIncreasingUnlockTime) {
      if (!value.unlockTime) {
        errors.unlockTime = `Unlock time is required`;
      } else if (value.unlockTime < new Date().getTime()) {
        errors.unlockTime = `Unlock time should be in the future`;
      }
    }

    return errors;
  };

  const formikProps = useFormik({
    enableReinitialize: true,
    validateOnChange: true,
    initialValues: initData,
    onSubmit: () => writeContract(),
    validate: (value: LockFormValues) => validateLockForm(value),
  });

  const calculatedAmount = convertToBigIntWithDecimals(
    formikProps.values.value,
    decimals,
  );

  const {
    writeFn: writeApprove,
    waitFn: waitApprove,
    readFn: readApprove,
    writeContract: writeContractApprove,
  } = useApprove({
    amount: calculatedAmount,
    callbacks: {
      onSuccessWrite(data) {
        showSuccessToast(data);
      },
      onError(e) {
        showErrorToast(e.message);
      },
      onSuccessConfirm(data) {
        showConfirmationToast();
        writeContract();
      },
    },
    enabled: !!address && isApprove,
  }) as UseApproveReturn;

  const allowanceValue = readApprove?.data
    ? (readApprove.data as bigint)
    : BigInt(0);

  const { writeFn, waitFn, writeContract, enabled } = useLock({
    type: type as LockType,
    value: calculatedAmount,
    unlockTime: formikProps.values.unlockTime
      ? Math.floor(formikProps.values.unlockTime / 1000)
      : undefined,
    allowance: allowanceValue,
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
        onClose();
      },
    },
  }) as UseLockReturn;

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
              <form onSubmit={formikProps.handleSubmit}>
                {type !== LockType.INCREASE_UNLOCK_TIME && (
                  <HStack spacing={8} alignItems={"start"}>
                    <Box w={"full"}>
                      <FormControl
                        mt={4}
                        isInvalid={
                          !!formikProps.errors.value &&
                          !!formikProps.touched.value
                        }
                      >
                        {" "}
                        <Flex justifyContent={"space-between"}>
                          <FormLabel alignItems={"baseline"} fontWeight={"600"}>
                            {t("INPUT_LOCK_AMOUNT")}{" "}
                          </FormLabel>
                        </Flex>
                        <Flex alignItems={"center"}>
                          <NumberInput
                            flex="1"
                            name="value"
                            value={formikProps.values.value}
                            min={0}
                            max={Number.MAX_SAFE_INTEGER}
                            onBlur={formikProps.handleBlur}
                            onChange={(strVal: string, val: number) =>
                              formikProps.setFieldValue(
                                "value",
                                strVal && Number(strVal) === val
                                  ? strVal
                                  : isNaN(val)
                                    ? 0
                                    : val,
                              )
                            }
                          >
                            <NumberInputField />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                          <Box px={2} minW={"3rem"}>
                            {config.tokenName}
                          </Box>
                        </Flex>
                        <Box>
                          <Text
                            fontSize={"sm"}
                            cursor="pointer"
                            onClick={() =>
                              formikProps.setFieldValue(
                                "value",
                                formatTokenAmountToNumber(
                                  balance || BigInt(0),
                                  decimals,
                                ),
                              )
                            }
                          >
                            {t("BALANCE")}:{" "}
                            {typeof balance === "undefined" ? (
                              "..."
                            ) : (
                              <>{tokenAmountFormat(balance, decimals, 2)}</>
                            )}{" "}
                            {config.tokenName}
                          </Text>
                          <FormErrorMessage fontSize={"xs"}>
                            {formikProps.errors.value}
                          </FormErrorMessage>
                        </Box>
                      </FormControl>
                    </Box>
                  </HStack>
                )}

                {type !== LockType.INCREASE_AMOUNT && (
                  <FormControl
                    mt={4}
                    isInvalid={
                      !!formikProps.errors.unlockTime &&
                      !!formikProps.touched.unlockTime
                    }
                  >
                    {" "}
                    <FormLabel alignItems={"baseline"} fontWeight={"600"}>
                      {t("SELECT_UNLOCK_DATE")}
                    </FormLabel>
                    <Flex alignItems={"center"}>
                      <Box>
                        <DatePicker
                          onEnter={async () => {
                            await formikProps.setTouched({ unlockTime: true });
                            await formikProps.validateForm();
                          }}
                          onBlur={async (value: any) => {
                            await formikProps.validateForm();
                          }}
                          onChangeCalendarDate={async (value) => {
                            const unlockTime: Date = value;
                            await formikProps.setFieldValue(
                              "unlockTime",
                              unlockTime.getTime(),
                            );
                            await formikProps.validateForm();
                          }}
                          oneTap={true}
                          format="yyyy-MM-dd"
                          placement="topStart"
                          cleanable={false}
                          defaultValue={
                            formikProps.values.unlockTime
                              ? new Date(formikProps.values.unlockTime)
                              : null
                          }
                          value={
                            formikProps.values.unlockTime
                              ? new Date(formikProps.values.unlockTime)
                              : null
                          }
                          shouldDisableDate={(date: Date) =>
                            date.setUTCHours(0, 0, 0, 0) % (3600 * 24 * 7) !==
                              0 ||
                            date.getTime() < new Date().getTime() ||
                            date.getTime() > addYears(new Date(), 4).getTime()
                          }
                        />
                      </Box>
                      <chakra.span fontSize={"sm"} ml={2}>
                        ({format(0, "z")})
                      </chakra.span>
                    </Flex>
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
                            color={themeColors.primaryText}
                            onClick={() => setDaysLater(option.days)}
                          >
                            {option.label}
                          </Button>
                        </GridItem>
                      ))}
                    </Grid>
                    <FormErrorMessage fontSize={"xs"}>
                      {formikProps.errors.unlockTime}
                    </FormErrorMessage>
                  </FormControl>
                )}

                <HStack mt={6}>
                  <Alert
                    status="info"
                    fontSize="14px"
                    bg={themeColors.secondaryLightColor}
                    color={themeColors.primaryText}
                  >
                    <AlertIcon boxSize="15px" color={themeColors.primaryText} />
                    <VStack spacing={2}>
                      <AlertDescription>
                        {t("TOKEN_LOCK_NOTE", { tokenName, veTokenName })}
                      </AlertDescription>
                      <AlertDescription>
                        {t("VE_TOKEN_DECREASE_NOTE", {
                          tokenName,
                          veTokenName,
                        })}
                      </AlertDescription>
                    </VStack>
                  </Alert>
                </HStack>

                {isApprove && allowanceValue < calculatedAmount ? (
                  <StyledButton
                    mt={4}
                    w={"full"}
                    variant="solid"
                    isDisabled={
                      !writeApprove.writeContract || !formikProps.isValid
                    }
                    isLoading={writeApprove.isPending || waitApprove.isLoading}
                    onClick={() => writeContractApprove()}
                  >
                    {t("APPROVE_TOKEN")}
                  </StyledButton>
                ) : (
                  <StyledButton
                    mt={4}
                    w={"full"}
                    variant="solid"
                    type="submit"
                    isDisabled={!formikProps.isValid}
                    isLoading={writeFn.isPending || waitFn.isLoading}
                  >
                    {t("VE_CREATE_LOCK")}
                  </StyledButton>
                )}
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      </CustomProvider>
    </>
  );
}
