export const tokenAmountFormat = (
  amount: bigint,
  decimals: number,
  precision: number,
): string => {
  const numerator = BigInt(10 ** decimals);
  return (Number(amount) / Number(numerator)).toFixed(precision);
};
