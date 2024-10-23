import { ContractProvider } from "components/providers/ContractProvider";
import AccountDashboard from "components";
import Render404 from "components/error/Render404";
import { environmentConfig } from "lib/constants/config";

const SystemPage = ({ systemName }: { systemName: string }) => {
  const lowerCaseSystemName = systemName.toLowerCase();

  return (
    <ContractProvider systemName={lowerCaseSystemName}>
      {(isValid) => (isValid ? <AccountDashboard /> : <Render404 />)}
    </ContractProvider>
  );
};

export async function getStaticPaths() {
  // environmentConfigからsystemNameとpathを抽出
  const paths = Object.entries(environmentConfig).flatMap(
    ([systemName, configs]) => {
      return Object.values(configs).map((config) => ({
        params: { systemName: config.path.replace("/", "") },
      }));
    },
  );

  return {
    paths,
    fallback: false, // 事前に生成されていないパスは404を返す
  };
}

export async function getStaticProps({
  params,
}: {
  params: { systemName: string };
}) {
  const { systemName } = params;
  return {
    props: {
      systemName,
    },
  };
}

export default SystemPage;
