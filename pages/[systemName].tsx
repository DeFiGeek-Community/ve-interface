import { useRouter } from "next/router";
import { ContractProvider } from "components/providers/ContractProvider";
import AccountDashboard from "components";
import Render404 from "components/error/Render404";
import { useState, useEffect } from "react";
import { Spinner, Center } from "@chakra-ui/react";

const SystemPage = () => {
  const { query } = useRouter();
  const { systemName } = query;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (systemName) {
      setLoading(false);
    }
  }, [systemName]);

  if (loading) {
    return (
      <Center height="100vh">
        <Spinner size="xl" color="blue.500" />
      </Center>
    );
  }

  if (typeof systemName !== "string") {
    return <div>Error: Invalid system name</div>;
  }

  const lowerCaseSystemName = systemName.toLowerCase();

  return (
    <ContractProvider systemName={lowerCaseSystemName}>
      {(isValid) => (
        isValid ? <AccountDashboard /> : <Render404 />
      )}
    </ContractProvider>
  );
};

export default SystemPage;