import { Container, Center } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { useContractContext } from "lib/contexts/ContractContext";
import Layout from "components/layouts/layout";
import VotingEscrow from "components/votingEscrow";
import TotalStats from "components/TotalStats";
import InitialReward from "components/reward/InitialReward";

export default function AccountDashboard() {
  const { address } = useAccount();
  const { config } = useContractContext();

  return (
    <Layout>
      <Container maxW="container.xl" py={10}>
        <Center>
          <TotalStats address={address} />
        </Center>
        <Center mt={10}>
          <VotingEscrow address={address} />
        </Center>
        {config.initialReward && (
          <Center mt={10}>
            <InitialReward address={address} />
          </Center>
        )}
      </Container>
    </Layout>
  );
}
