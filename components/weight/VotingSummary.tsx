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
import { format } from "date-fns";
import { useAccount } from "wagmi";
import { useContractContext } from "lib/contexts/ContractContext";
import useTimeTotal from "hooks/ScoreWeightController/useTimeTotal";
import StyledCard from "components/shared/StyledCard";
import StyledHStack from "components/shared/StyledHStack";
import PieChartComponent from "components/weight/PieChartComponent";

const VotingSummary = () => {
  const { t } = useTranslation();
  const { config } = useContractContext();
  const themeColors = config.themeColors;
  const { tokenName, veTokenName } = config;
  const { address } = useAccount();
  const { data:  timeTotal }  = useTimeTotal(address);

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
          {typeof timeTotal === "undefined" ? (
            <Spinner mr={3} />
          ) : timeTotal  === BigInt(0) ? (
            <>{"-- / -- / --"}</>
          ) : (
            <>{format(new Date(Number(timeTotal) * 1000), "yyyy/MM/dd HH:mm")}</>
          )}
        </StyledHStack>
      </CardBody>
    </StyledCard>
  );
};

export default VotingSummary;