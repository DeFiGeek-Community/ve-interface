export const tokenAmountFormat = (
  amount: bigint,
  decimals: number,
  precision: number,
): string => {
  const numerator = BigInt(10 ** decimals);
  return (Number(amount) / Number(numerator)).toFixed(precision);
};

export const formatTokenAmountToNumber = (
  amount: bigint,
  decimals: number,
): number => {
  const numerator = BigInt(10 ** decimals);
  return parseFloat((Number(amount) / Number(numerator)).toString());
};

export const convertToBigIntWithDecimals = (
  num: number,
  decimals: number,
): bigint => {
  const multiplier = 10 ** decimals;
  return BigInt(Math.floor(num * multiplier));
};

export const calculatePercentage = (
  balance: bigint | undefined,
  tokenTotalSupply: bigint | undefined,
): string | undefined => {
  if (
    balance !== undefined &&
    tokenTotalSupply !== undefined &&
    tokenTotalSupply !== BigInt(0)
  ) {
    return ((Number(balance) / Number(tokenTotalSupply)) * 100).toFixed(2);
  }
  return undefined;
};

export const getEtherscanLink = (
  chain: string,
  hash: string,
  type: "tx" | "token" | "address" | "block",
): string => {
  return `https://${chain === "mainnet" ? "" : `${chain}.`}etherscan.io/${type}/${hash}`;
};
