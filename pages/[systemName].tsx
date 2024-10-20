import { useRouter } from "next/router";
import { ContractProvider } from "components/providers/ContractProvider";
import AccountDashboard from "components";

const SystemPage = () => {
  const { query } = useRouter();
  const { systemName } = query;

  if (typeof systemName !== "string") {
    return <div>Error: Invalid system name</div>;
  }
  const lowerCaseSystemName = systemName.toLowerCase();

  return (
    <ContractProvider systemName={lowerCaseSystemName}>
      <AccountDashboard />
    </ContractProvider>
  );
};

export default SystemPage;
