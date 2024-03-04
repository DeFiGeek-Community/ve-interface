export const tokenAmountFormat = (
  amount: bigint,
  decimals: number,
  precision: number,
): string => {
  const numerator = BigInt(10 ** decimals);
  return (Number(amount) / Number(numerator)).toFixed(precision);
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
