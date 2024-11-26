import React from "react";
import {
  Divider,
  HStack,
  Text,
  CardHeader,
  CardBody,
  Heading,
  Spinner,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import StyledCard from "components/shared/StyledCard";
import StyledHStack from "components/shared/StyledHStack";
import { useContractContext } from "lib/contexts/ContractContext";
import PieChartComponent from "components/weight/PieChartComponent";

const VotingSummary = () => {
  const { t } = useTranslation();
  const { config } = useContractContext();
  const themeColors = config.themeColors;
  const { tokenName, veTokenName } = config;

  // Unixタイムスタンプをわかりやすい日付に変換
  const unixTime = 1701129600; // 例として固定Unixタイムを使用
  const date = new Date(unixTime * 1000);
  const formattedDate = date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });

  return (
    <StyledCard>
      <CardHeader bg={themeColors.primaryColor} py={2}>
        <Heading size="md" color={"white"}>
          {t("VOTING_SUMMARY")}
        </Heading>
      </CardHeader>
      <CardBody>
        <Heading fontSize={"md"} pb={1}>
          <HStack>
            <Text>{t("VOTE_DESCRIPTION", { tokenName, veTokenName })}</Text>
          </HStack>
        </Heading>
        <Divider variant="dashed" my={2} />

        <PieChartComponent />

        <Divider variant="dashed" my={2} />
        <StyledHStack title={t("NEXT_EFFECTIVE_DATE")} unit={""} mt={2}>
          {formattedDate}
        </StyledHStack>
      </CardBody>
    </StyledCard>
  );
};

export default VotingSummary;