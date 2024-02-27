import {
  CardHeader,
  CardBody,
  Heading,
  Tooltip,
  Divider,
  HStack,
  chakra,
  CardFooter,
  Text,
} from "@chakra-ui/react";
import { QuestionIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";
import { CustomButton } from "components/shared/CustomButton";
import { StyledCard } from "components/shared/StyledCard";

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
          <Tooltip
            hasArrow
            bg={"#818181"}
            label={
              <Text whiteSpace={"pre-wrap"}>{t("EARLY_USER_REWARD_HELP")}</Text>
            }
          >
            <QuestionIcon fontSize={"md"} mb={1} ml={1} />
          </Tooltip>
        </Heading>
        <Divider my={2} />
        <HStack justifyContent={"space-between"}>
          <chakra.div>{t("ALLOCATED")}</chakra.div>
          <chakra.div fontSize={"2xl"}>
            {"0.00"}
            <chakra.span fontSize={"lg"} ml={1}>
              YMT
            </chakra.span>
          </chakra.div>
        </HStack>
        <HStack justifyContent={"space-between"}>
          <chakra.div>{t("CLAIMED")}</chakra.div>
          <chakra.div fontSize={"2xl"}>
            {"0.00"}
            <chakra.span fontSize={"lg"} ml={1}>
              YMT
            </chakra.span>
          </chakra.div>
        </HStack>
        <HStack justifyContent={"space-between"}>
          <chakra.div>{t("CLAIMABLE")}</chakra.div>
          <chakra.div fontSize={"2xl"}>
            {"0.00"}
            <chakra.span fontSize={"lg"} ml={1}>
              YMT
            </chakra.span>
          </chakra.div>
        </HStack>
      </CardBody>
      <CardFooter pt={0} justifyContent={"flex-end"}>
        <CustomButton size={"sm"}>{t("CLAIM")}</CustomButton>
      </CardFooter>
    </StyledCard>
  );
}
