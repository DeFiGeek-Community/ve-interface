import React, { useState } from "react";
import {
  Flex,
  HStack,
  VStack,
  Box,
  Text,
  Alert,
  CardHeader,
  CardBody,
  Heading,
  chakra,
  Select,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  NumberInputStepper,
  NumberDecrementStepper,
  Divider,
  Grid,
  GridItem,
  Button,
} from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { useTranslation } from "react-i18next";
import StyledCard from "components/shared/StyledCard";
import StyledHStack from "components/shared/StyledHStack";
import StyledHStackItem from "components/shared/StyledHStackItem";
import StyledButton from "components/shared/StyledButton";
import { useContractContext } from "lib/contexts/ContractContext";
import AmountRenderer from "components/shared/AmountRenderer";
import useBalanceOf from "hooks/VotingEscrow/useBalanceOf";
import useVoteUserPower from "hooks/ScoreWeightController/useVoteUserPower";
import useVote, { UseVoteReturn } from "hooks/ScoreWeightController/useVote";
import useVoteUserSlopes from "hooks/ScoreWeightController/useVoteUserSlopes";
import useToastNotifications from "hooks/useToastNotifications";
import { tokenAmountFormat } from "lib/utils";

const VotingManagement = () => {
  const { t } = useTranslation();
  const { address } = useAccount();
  const { config, addresses, triggerRefetch } = useContractContext();
  const themeColors = config.themeColors;
  const { tokenName, veTokenName } = config;

  const { showSuccessToast, showErrorToast, showConfirmationToast } =
    useToastNotifications();

  const { data: balance } = useBalanceOf(address) as {
    data: bigint | undefined;
  };
  const { data: voteUserPower } = useVoteUserPower(address) as {
    data: bigint | undefined;
  };

  const votedBalance =
    balance !== undefined && voteUserPower !== undefined
      ? (balance * BigInt(voteUserPower)) / BigInt(10000)
      : BigInt(0);
  const votableBalance =
    balance !== undefined ? balance - votedBalance : BigInt(0);

  const [votingPower, setVotingPower] = useState(0);
  const [selectedScore, setSelectedScore] = useState("");
  const [selectedAddress, setSelectedAddress] = useState<
    `0x${string}` | undefined
  >(undefined);

  const balanceNumber =
    balance !== undefined
      ? Number(tokenAmountFormat(balance, config.TokenDecimals, 2))
      : 0;
  const balancePercentage = balance
    ? (balanceNumber * (votingPower * 0.01)).toFixed(2)
    : 0;
  const isVoteExecutable = votingPower > 0 && selectedScore !== "";

  const handleExecute = () => {
    writeContract();
  };

  const { writeFn, waitFn, writeContract } = useVote({
    scoreAddr: selectedAddress,
    userWeight: votingPower,
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
  }) as UseVoteReturn;

  return (
    <StyledCard>
      <CardHeader bg={themeColors.secondaryColor} py={2}>
        <Heading size="md" color={"white"}>
          {t("SCORE_VOTING_MANAGEMENT")}
        </Heading>
      </CardHeader>
      <CardBody>
        <StyledHStack title={t("VOTING_BALANCE")} unit={veTokenName}>
          <AmountRenderer amount={balance} />
        </StyledHStack>
        <HStack justifyContent={"space-between"} alignItems={"baseline"} mt={4}>
          <Text>{t("VOTED_BALANCE")}</Text>
          <VStack spacing={0} align="flex-end">
            <Box fontSize={"2xl"}>
              <AmountRenderer amount={votedBalance} />
              <chakra.span fontSize={"lg"} ml={1}>
                {veTokenName}
              </chakra.span>
            </Box>
            {/* {addresses.Score?.map(({ name, address: scoreAddress }, index) => {
              const { data: voteUserPower } = useVoteUserSlopes(
                address,
                scoreAddress
              ) as {
                data: bigint[] | undefined;
              };
              const power = voteUserPower ? voteUserPower[1] : BigInt(0);
              if (power > BigInt(0)) {
                return (
                  <Box key={index} fontSize={"md"} mr={2}>
                    {name} : {Number(power) / 100}
                    <chakra.span fontSize={"sm"} ml={1}>
                      {"%"}
                    </chakra.span>
                  </Box>
                );
              }
              return null;
            })} */}
          </VStack>
        </HStack>
        <StyledHStack title={t("VOTABLE_BALANCE")} unit={veTokenName} mt={4}>
          <AmountRenderer amount={votableBalance} />
        </StyledHStack>
        <Divider variant="dashed" my={2} />

        <StyledHStackItem title={t("SELECT_SCORE")} mt={5}>
          <Flex width="100%">
            <Select
              placeholder={t("SELECT")}
              value={selectedScore}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedScore(value as string);
                const selected = addresses.Score?.find(
                  ({ name }) => name === value,
                );
                setSelectedAddress(selected?.address);
              }}
              flex="1"
              maxWidth={"100px"}
              fontWeight="bold"
              mr={6}
            >
              {addresses.Score?.map(({ name, address }, index) => (
                <option key={index} value={name}>
                  {t(name)}
                </option>
              ))}
            </Select>
          </Flex>
        </StyledHStackItem>
        <StyledHStackItem title={t("SCORE_PERCENTAGE")} mt={5}>
          <VStack alignItems={"flex-start"} width="100%" gap={0}>
            <Flex alignItems={"center"} width="100%">
              <NumberInput
                flex="1"
                name="value"
                maxWidth={"100px"}
                min={0}
                max={100}
                value={votingPower}
                onChange={(strVal: string, val: number) => {
                  setVotingPower(val);
                }}
              >
                <NumberInputField fontWeight="bold" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <chakra.span fontSize={"md"} ml={1}>
                %
              </chakra.span>
            </Flex>
            <Grid templateColumns="repeat(2, 1fr)" mt={0} py={0}>
              <GridItem>
                <Button
                  size={"xs"}
                  variant="outline"
                  color={themeColors.primaryText}
                  onClick={() => setVotingPower(50)}
                >
                  50%
                </Button>
              </GridItem>
              <GridItem>
                <Button
                  size={"xs"}
                  color={themeColors.primaryText}
                  variant="outline"
                  onClick={() => setVotingPower(100)}
                >
                  100%
                </Button>
              </GridItem>
            </Grid>
          </VStack>
        </StyledHStackItem>

        {isVoteExecutable && (
          <Alert
            mt={4}
            status="info"
            fontSize="14px"
            bg={themeColors.secondaryLightColor}
            color={themeColors.primaryText}
          >
            {t("VOTING_POWER_ALLOCATION", {
              vote: ` ${balancePercentage} ${veTokenName} (${votingPower}%) `,
              selectedScore,
            })}
          </Alert>
        )}
        <StyledHStackItem title={""}>
          <StyledButton
            size={"md"}
            mr={5}
            mt={4}
            onClick={handleExecute}
            isLoading={writeFn.isPending || waitFn.isLoading}
            isDisabled={!isVoteExecutable || !writeFn.writeContract}
          >
            {t("VOTE_EXECUTE")}
          </StyledButton>
        </StyledHStackItem>
      </CardBody>
    </StyledCard>
  );
};

export default VotingManagement;
