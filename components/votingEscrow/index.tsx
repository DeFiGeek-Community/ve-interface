import { Card, CardHeader, CardBody, Heading, Divider } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import LockStats from "components/votingEscrow/LockStats";
import Reward from "components/votingEscrow/Rewards";

export default function VotingEscrow({ address }: { address?: `0x${string}` }) {
  const { t } = useTranslation();

  return (
    <Card
      flex={1}
      maxW="xl"
      bg={"#fcfaf2"}
      style={{
        boxShadow: "rgba(0, 0, 0, 0.25) 3px 3px 0px",
        borderRadius: "0px",
      }}
      color={"#818181"}
    >
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
    </Card>
  );
}
