import {
  CardHeader,
  CardBody,
  Heading,
  Tooltip,
  Divider,
  HStack,
  Text,
  Image,
} from "@chakra-ui/react";
import { QuestionIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";
import { StyledCard } from "components/shared/StyledCard";
import { StyledHStack } from "components/shared/StyledHStack";

export default function VotingEscrow({ address }: { address?: `0x${string}` }) {
  const { t } = useTranslation();

  return (
    <StyledCard>
      <CardHeader bg={"#5bad92"} py={2}>
        <Heading size="md" color={"white"}>
          Total YMT Overview
        </Heading>
      </CardHeader>
      <CardBody>
        <Heading fontSize={"xl"} pb={1}>
          <HStack>
            <Image src="/logo192.png" alt="Logo" boxSize="24px" />
            <Text>{t("VE_YMT")}</Text>
            <Tooltip
              hasArrow
              bg={"#818181"}
              label={
                <Text whiteSpace={"pre-wrap"}>{t("VE_YMT_REWARD_HELP")}</Text>
              }
            >
              <QuestionIcon fontSize={"lg"} cursor="help" />
            </Tooltip>
          </HStack>
        </Heading>
        <Divider variant="dashed" my={2} />
        <StyledHStack title={t("TOTAL_YMT")} value={"0.0"} unit={"YMT"} />
        <StyledHStack
          title={t("TOTAL_YMT_VOTE_LOCKED")}
          value={"0.0"}
          unit={"YMT"}
          mt={1}
        />
        <StyledHStack
          title={t("PERCENTAGE_YMT_LOCKED")}
          value={"0.0"}
          unit={"%"}
          mt={1}
        />
        <StyledHStack
          title={t("TOTAL_VE_YMT")}
          value={"0.0"}
          unit={"veYMT"}
          mt={1}
        />
      </CardBody>
    </StyledCard>
  );
}
