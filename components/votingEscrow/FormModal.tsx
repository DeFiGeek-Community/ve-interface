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
import { LockType } from "lib/types/VotingEscrow";
import { CustomButton } from "components/shared/CustomButton";

type FormModalProps = {
  address?: `0x${string}`;
  type: string;
  isOpen: boolean;
  onClose: () => void;
};

export default function FormModal({
  address,
  type,
  isOpen,
  onClose,
}: FormModalProps) {
  const { colorMode } = useColorMode();
  const locale = "ja"; // Mock locale
  const { t } = useTranslation();

  return (
    <>
      <CustomProvider theme={colorMode} locale={locale === "ja" ? jaJP : enUS}>
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
                            max={Number.MAX_SAFE_INTEGER}
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
                        <Text fontSize={"sm"}>{t("BALANCE")}: 0 YMT</Text>
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
                          value={null}
                        />
                      </Box>
                      <chakra.span fontSize={"sm"} ml={2}>
                        (UTC)
                      </chakra.span>
                    </Flex>
                    <Grid
                      mt={2}
                      templateRows="repeat(2, 1fr)"
                      templateColumns="repeat(3, 1fr)"
                      gap={2}
                    >
                      <GridItem>
                        <Button size="sm" w="full" color="#818181">
                          1 week
                        </Button>
                      </GridItem>
                      <GridItem>
                        <Button size="sm" w="full" color="#818181">
                          1 month
                        </Button>
                      </GridItem>
                      <GridItem>
                        <Button size="sm" w="full" color="#818181">
                          3 months
                        </Button>
                      </GridItem>
                      <GridItem>
                        <Button size="sm" w="full" color="#818181">
                          6 months
                        </Button>
                      </GridItem>
                      <GridItem>
                        <Button size="sm" w="full" color="#818181">
                          1 year
                        </Button>
                      </GridItem>
                      <GridItem>
                        <Button size="sm" w="full" color="#818181">
                          4 years
                        </Button>
                      </GridItem>
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

                <CustomButton
                  mt={4}
                  w={"full"}
                  variant="solid"
                  colorScheme="green"
                >
                  {t("VE_CREATE_LOCK")}
                </CustomButton>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      </CustomProvider>
    </>
  );
}
