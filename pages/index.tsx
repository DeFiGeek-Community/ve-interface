import { Box, Center, Heading, Text, VStack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

// 元のインポートをコメントアウト
// import AccountDashboard from "components";
// import { ContractProvider } from "components/providers/ContractProvider";
// import { Spinner, Center } from "@chakra-ui/react";

export default function VotingEscrow() {
  const { t } = useTranslation();
  
  // 準備中表示
  return (
    <Center height="100vh">
      <VStack spacing={6}>
        <Heading size="xl">メンテナンス中</Heading>
        <Heading size="xl">Maintenance</Heading>
        <Text fontSize="lg">{t("COMMING_SOON")}</Text>
      </VStack>
    </Center>
  );
  
  // 元のコードをコメントアウト
  /*
  return (
    <ContractProvider systemName={"yamato"}>
      {(isValid) =>
        isValid ? (
          <AccountDashboard />
        ) : (
          <Center height="100vh">
            <Spinner size="xl" color="blue.500" />
          </Center>
        )
      }
    </ContractProvider>
  );
  */
}
