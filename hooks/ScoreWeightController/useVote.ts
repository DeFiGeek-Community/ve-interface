import { useEffect } from "react";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { useContractContext } from "lib/contexts/ContractContext";

export type UseVoteReturn = {
  writeFn: ReturnType<typeof useWriteContract>;
  waitFn: ReturnType<typeof useWaitForTransactionReceipt>;
  writeContract: () => void;
};

export default function useVote({
  scoreAddr,
  userWeight,
  callbacks,
}: {
  scoreAddr: `0x${string}` | undefined;
  userWeight: number;
  callbacks?: {
    onSuccessWrite?: (data: any) => void;
    onError?: (error: Error) => void;
    onSuccessConfirm?: (data: any) => void;
  };
}): UseVoteReturn {
  const { chain, address } = useAccount();
  const { addresses, abis } = useContractContext();
  const weight = BigInt(userWeight) * BigInt(100);

  const config = {
    address: addresses.GaugeController as `0x${string}`,
    abi: abis.GaugeController,
    functionName: "voteForScoreWeights" as const,
    args: [scoreAddr || "0x0", weight],
    chainId: chain?.id,
  };

  const writeFn = useWriteContract({
    mutation: {
      onSuccess: callbacks?.onSuccessWrite,
      onError: callbacks?.onError,
    },
  });

  const writeContract = () => {
    if (!!address) {
      writeFn.writeContract(config);
    }
  };

  const waitFn = useWaitForTransactionReceipt({
    hash: writeFn?.data,
    chainId: chain?.id,
  });

  useEffect(() => {
    if (waitFn.isSuccess) {
      callbacks?.onSuccessConfirm?.(waitFn.data);
    } else if (waitFn.isError) {
      callbacks?.onError?.(waitFn.error);
    }
  }, [waitFn.isSuccess, waitFn.isError]);

  return {
    writeFn,
    waitFn,
    writeContract,
  };
}
