import { Container, Center } from "@chakra-ui/react";
import Layout from "components/layouts/layout";
import VotingSummary from "components/weight/VotingSummary";

export default function Weight() {

  return (
    <Layout>
      <Container maxW="container.xl" py={10}>
        <Center>
          <VotingSummary />
        </Center>
        <Center mt={10}>
        </Center>
      </Container>
    </Layout>
  );
}
