import { CardHeader, CardBody, Heading, Divider } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useContractContext } from "lib/contexts/ContractContext";
import LockStats from "components/votingEscrow/LockStats";
import InitialCheckpoint from "components/reward/InitialCheckpoint";
import Reward from "components/reward/Rewards";
import FeeRewards from "components/reward/FeeReward";
import StyledCard from "components/shared/StyledCard";

export default function VotingEscrow({ address }: { address?: `0x${string}` }) {
  const { t } = useTranslation();
  const { config } = useContractContext();
  const tokenName = config.tokenName;
  const themeColors = config.themeColors;

  return (
    <StyledCard>
      <CardHeader bg={themeColors.secondaryColor} py={2}>
        <Heading size="md" color={"white"}>
          {t("MY_PORTFOLIO", { tokenName })}
        </Heading>
      </CardHeader>
      <CardBody>
        <LockStats address={address} />
        {config.checkpoint && <InitialCheckpoint address={address} />}
        {config.minterReward && (
          <>
            <Divider variant="dashed" py={2} />
            <Reward address={address} />
          </>
        )}
        {config.feeReward && (
          <>
            <Divider variant="dashed" py={2} />
            <FeeRewards address={address} />
          </>
        )}
      </CardBody>
    </StyledCard>
  );
}
