import {
  CardHeader,
  CardBody,
  Heading,
  Divider,
  HStack,
  Text,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { QuestionIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";
import { calculatePercentage } from "lib/utils";
import { useContractContext } from "lib/contexts/ContractContext";
import StyledCard from "components/shared/StyledCard";
import StyledHStack from "components/shared/StyledHStack";
import StyledTooltip from "components/shared/StyledTooltip";
import AmountRenderer from "components/shared/AmountRenderer";
import useTokenTotalSupply from "hooks/Token/useTotalSupply";
import useBalanceOf from "hooks/Token/useBalanceOf";
import useTotalSupply from "hooks/VotingEscrow/useTotalSupply";

export default function VotingEscrow({ address }: { address?: `0x${string}` }) {
  const { t } = useTranslation();
  const { addresses, config } = useContractContext();
  const { tokenName, veTokenName } = config;

  const { data: tokenTotalSupply } = useTokenTotalSupply() as {
    data: bigint | undefined;
  };
  const { data: balance } = useBalanceOf(addresses.VotingEscrow) as {
    data: bigint | undefined;
  };
  const { data: totalSupply } = useTotalSupply(address) as {
    data: bigint | undefined;
  };
  let percentageLocked = calculatePercentage(balance, tokenTotalSupply);
  return (
    <StyledCard>
      <CardHeader bg={"#5bad92"} py={2}>
        <Heading size="md" color={"white"}>
          {t("TOTAL_OVERVIEW", { tokenName })}
        </Heading>
      </CardHeader>
      <CardBody>
        <Heading fontSize={"xl"} pb={1}>
          <HStack>
            <Image src="/logo192.png" alt="Logo" boxSize="24px" />
            <Text>{veTokenName}</Text>
            <StyledTooltip labelText={t("VE_TOKEN_REWARD_HELP")}>
              <QuestionIcon fontSize={"lg"} cursor="help" />
            </StyledTooltip>
          </HStack>
        </Heading>
        <Divider variant="dashed" my={2} />
        <StyledHStack title={t("TOTAL_TOKEN", { tokenName })} unit={tokenName}>
          <AmountRenderer amount={tokenTotalSupply} />
        </StyledHStack>
        <StyledHStack
          title={t("TOTAL_TOKEN_VOTE_LOCKED", { tokenName })}
          unit={tokenName}
          mt={1}
        >
          <AmountRenderer amount={balance} />
        </StyledHStack>
        <StyledHStack
          title={t("PERCENTAGE_TOKEN_LOCKED", { tokenName })}
          unit={"%"}
          mt={1}
        >
          {typeof percentageLocked === "undefined" ? (
            <Spinner />
          ) : (
            <>{percentageLocked}</>
          )}
        </StyledHStack>
        <StyledHStack
          title={t("TOTAL_VE_TOKEN", { veTokenName })}
          unit={veTokenName}
          mt={1}
        >
          <AmountRenderer amount={totalSupply} />
        </StyledHStack>
      </CardBody>
    </StyledCard>
  );
}
