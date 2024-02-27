import {
  HStack,
  VStack,
  Text,
  chakra,
  useToast,
  Box,
} from "@chakra-ui/react";
import { QuestionIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";
import FeeRewards from "components/votingEscrow/FeeReward";
import { StyledButton } from "components/shared/StyledButton";
import { StyledTooltip } from "components/shared/StyledTooltip";

export default function Reward({ address }: { address?: `0x${string}` }) {
  const { t } = useTranslation();
  const toast = useToast({ position: "top-right", isClosable: true });

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
              {"0.0"}
              <chakra.span fontSize={"lg"} ml={1}>
                YMT
              </chakra.span>
            </Box>
            <StyledButton variant={"solid"} size={"sm"}>
              {t("CLAIM")}
            </StyledButton>
          </HStack>
          <FeeRewards />
        </VStack>
      </HStack>
    </>
  );
}
