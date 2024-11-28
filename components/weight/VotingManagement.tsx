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
import { tokenAmountFormat } from "lib/utils";

const VotingManagement = () => {
  const { t } = useTranslation();
  const { address } = useAccount();
  const { config } = useContractContext();
  const themeColors = config.themeColors;
  const { tokenName, veTokenName } = config;

  // const { data: balance } = useBalanceOf(address) as {
  //   data: bigint | undefined;
  // };

  const balance = BigInt(100000000000000000000);
  const votedBalance = BigInt(10000000000000000000);
  const votableBalance = BigInt(90000000000000000000);

  const [votingPower, setVotingPower] = useState(100);
  const [numberInputValue, setNumberInputValue] = useState(0);
  const [selectedScore, setSelectedScore] = useState("");
  const [scorePercentage, setScorePercentage] = useState(0);

  const handleExecute = () => {
    console.log("Executing vote with:", {
      votingPower,
      selectedScore,
      scorePercentage,
    });
  };
  const balanceNumber = Number(
    tokenAmountFormat(balance, config.TokenDecimals, 2)
  );
  const balancePercentage = balance
    ? (balanceNumber * (numberInputValue * 0.01)).toFixed(2)
    : 0;

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
            <Box fontSize={"md"}  mr={2}>
              CJPY : 5
              <chakra.span fontSize={"sm"} ml={1}>
                {"%"}
              </chakra.span>
            </Box>
            <Box fontSize={"md"}  mr={2}>
              CUSD : 5
              <chakra.span fontSize={"sm"} ml={1}>
                {"%"}
              </chakra.span>
            </Box>
          </VStack>
        </HStack>
        <StyledHStack title={t("VOTABLE_BALANCE")} unit={veTokenName} mt={4}>
          <AmountRenderer amount={votableBalance} />
        </StyledHStack>
        <Divider variant="dashed" my={2} />

        <StyledHStackItem title={t("SELECT_SCORE")} mt={4}>
          <Flex width="100%">
            <Select
              placeholder={t("SELECT_SCORE")}
              value={selectedScore}
              onChange={(e) => setSelectedScore(e.target.value)}
              flex="1"
              maxWidth={"170px"}
              mr={5}
            >
              <option value="CJPY">{t("CJPY")}</option>
              <option value="CUSD">{t("CUSD")}</option>
              <option value="CEUR">{t("CEUR")}</option>
            </Select>
          </Flex>
        </StyledHStackItem>
        <StyledHStackItem title={t("SCORE_PERCENTAGE")} mt={4}>
          <Flex alignItems={"center"} width="100%">
            <NumberInput
              flex="1"
              name="value"
              maxWidth={"170px"}
              min={0}
              max={Number.MAX_SAFE_INTEGER}
              value={numberInputValue}
              onChange={(strVal: string, val: number) => {
                setNumberInputValue(val);
              }}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <chakra.span fontSize={"md"} ml={1}>
              %
            </chakra.span>
          </Flex>
        </StyledHStackItem>

        <Alert
          mt={4}
          status="info"
          fontSize="14px"
          bg={themeColors.secondaryLightColor}
          color={themeColors.primaryText}
        >
          {t("VOTING_POWER_ALLOCATION", {
            vote: ` ${balancePercentage} ${veTokenName} (${numberInputValue}%) `,
            selectedScore,
          })}
        </Alert>
        <StyledHStackItem title={""}>
          <StyledButton size={"md"} mr={5} mt={4} onClick={handleExecute}>
            {t("VOTE_EXECUTE")}
          </StyledButton>
        </StyledHStackItem>
      </CardBody>
    </StyledCard>
  );
};

export default VotingManagement;
