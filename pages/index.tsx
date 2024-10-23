import AccountDashboard from "components";
import { ContractProvider } from "components/providers/ContractProvider";
import { Spinner, Center } from "@chakra-ui/react";

export default function VotingEscrow() {
  return (
    <ContractProvider systemName={"yamato"}>
      {(isValid) => (
        isValid ? (
          <AccountDashboard />
        ) : (
          <Center height="100vh">
            <Spinner size="xl" color="blue.500" />
          </Center>
        )
      )}
    </ContractProvider>
  );
}