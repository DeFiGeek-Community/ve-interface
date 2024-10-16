import React from "react";
import { Box } from "@chakra-ui/react";
import Header from "./Header";
import Footer from "./Footer";
import MetaTags from "./MetaTags";
import { useContractContext } from "lib/contexts/ContractContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { config } = useContractContext();

  const backgroundImageSrc = config ? `/${config.backgroundImagePath}` : null;

  return (
    <>
      <MetaTags />
      <Header />
      <Box bgImage={`url('${backgroundImageSrc}')`}>{children}</Box>
      <Footer />
    </>
  );
}