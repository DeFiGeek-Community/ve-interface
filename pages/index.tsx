import AccountDashboard from "components";
import { ContractProvider } from "components/providers/ContractProvider";

export default function VotingEscrow() {
  return (
    <ContractProvider systemName={"yamato"}>
      <AccountDashboard />
    </ContractProvider>
  );
}
