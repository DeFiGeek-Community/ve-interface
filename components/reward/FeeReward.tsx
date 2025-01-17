import { HStack, Text, VStack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useContractContext } from "lib/contexts/ContractContext";
import { QuestionIcon } from "@chakra-ui/icons";
import TokenReward from "./TokenReward";
import StyledTooltip from "components/shared/StyledTooltip";

export default function FeeReward({ address }: { address?: `0x${string}` }) {
  const { t } = useTranslation();
  const { config } = useContractContext();
  const { tokenName, veTokenName, rewardTokens } = config;

  return (
    <HStack justifyContent={"space-between"} alignItems={"baseline"} mt={4}>
      <Text>
        {`Fee${t("REWARDS")}`}
        <StyledTooltip
          labelText={
            config.tokenName === "YMT"
              ? t("FEE_REWARDS_HELP_YAMATO")
              : t("FEE_REWARDS_HELP", { veTokenName })
          }
        >
          <QuestionIcon fontSize={"md"} mb={1} ml={1} />
        </StyledTooltip>
      </Text>
      <VStack spacing={2} align="end">
        {rewardTokens.map(({ name, address }) => (
          <TokenReward key={name} token={name} tokenAddress={address} />
        ))}
      </VStack>
    </HStack>
  );
}
