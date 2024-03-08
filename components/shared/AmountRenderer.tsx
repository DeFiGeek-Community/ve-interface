import React from "react";
import { Spinner } from "@chakra-ui/react";
import { useContractContext } from "lib/contexts/ContractContext";
import { tokenAmountFormat } from "lib/utils";

type AmountRendererProps = {
  amount: bigint | undefined;
};

const AmountRenderer: React.FC<AmountRendererProps> = ({ amount }) => {
  const { config } = useContractContext();

  return typeof amount === "undefined" ? (
    <Spinner />
  ) : (
    <>{tokenAmountFormat(amount, config.TokenDecimals, 2)}</>
  );
};

export default AmountRenderer;
