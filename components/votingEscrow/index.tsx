import { CardHeader, CardBody, Heading, Divider } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import LockStats from "components/votingEscrow/LockStats";
import Reward from "components/votingEscrow/Rewards";
import StyledCard from "components/shared/StyledCard";

export default function VotingEscrow({ address }: { address?: `0x${string}` }) {
  const { t } = useTranslation();

  return (
    <StyledCard>
      <CardHeader bg={"#f9aea5"} py={2}>
        <Heading size="md" color={"white"}>
          My YMT Portfolio
        </Heading>
      </CardHeader>
      <CardBody>
        <LockStats address={address} />
        <Divider variant="dashed" py={2} />
        <Reward address={address} />
      </CardBody>
    </StyledCard>
  );
}
