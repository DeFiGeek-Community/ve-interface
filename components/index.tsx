import { Container, Center } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import Layout from "components/layouts/layout";
import VotingEscrow from "components/votingEscrow";
import TotalStats from "components/TotalStats";
import EarlyUserReward from "components/EarlyUserReward";

export default function AccountDashboard() {
  const { address } = useAccount();

  return (
    <Layout>
      <Container maxW="container.xl" py={10}>
        <Center>
          <TotalStats address={address} />
        </Center>
        <Center mt={10}>
          <VotingEscrow address={address} />
        </Center>
        <Center mt={10}>
          <EarlyUserReward address={address} />
        </Center>
      </Container>
    </Layout>
  );
}
