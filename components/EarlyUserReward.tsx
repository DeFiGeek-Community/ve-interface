import {
  CardHeader,
  CardBody,
  Heading,
  Divider,
  CardFooter,
} from "@chakra-ui/react";
import { QuestionIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";
import StyledButton from "components/shared/StyledButton";
import StyledCard from "components/shared/StyledCard";
import StyledHStack from "components/shared/StyledHStack";
import StyledTooltip from "components/shared/StyledTooltip";

export default function EarlyUserReward({
  address,
}: {
  address?: `0x${string}`;
}) {
  const { t } = useTranslation();

  return (
    <StyledCard>
      <CardHeader bg={"#f9aea5"} py={2}>
        <Heading size="md" color={"white"}>
          Initial Reward
        </Heading>
      </CardHeader>
      <CardBody>
        <Heading fontSize={"xl"} pb={1}>
          {t("EARLY_USER_REWARD")}
          <StyledTooltip labelKey="EARLY_USER_REWARD_HELP">
            <QuestionIcon fontSize={"md"} mb={1} ml={1} />
          </StyledTooltip>
        </Heading>
        <Divider my={2} />
        <StyledHStack title={t("ALLOCATED")} unit={"YMT"}>
          {"0.0"}
        </StyledHStack>
        <StyledHStack title={t("CLAIMED")} unit={"YMT"} mt={1}>
          {"0.0"}
        </StyledHStack>
        <StyledHStack title={t("CLAIMABLE")} unit={"YMT"} mt={1}>
          {"0.0"}
        </StyledHStack>
      </CardBody>
      <CardFooter pt={0} justifyContent={"flex-end"}>
        <StyledButton size={"sm"}>{t("CLAIM")}</StyledButton>
      </CardFooter>
    </StyledCard>
  );
}
