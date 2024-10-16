import React from "react";
import { Spinner } from "@chakra-ui/react";
import { useContractContext } from "lib/contexts/ContractContext";
import { tokenAmountFormat } from "lib/utils";

type AmountRendererProps = {
  amount: bigint | undefined;
  precision?: number;
};

const AmountRenderer: React.FC<AmountRendererProps> = ({
  amount,
  precision = 2,
}) => {
  const { config } = useContractContext();

  return typeof amount === "undefined" ? (
    <Spinner mr={3} />
  ) : (
    <>{tokenAmountFormat(amount, config.TokenDecimals, precision)}</>
  );
};

export default AmountRenderer;
