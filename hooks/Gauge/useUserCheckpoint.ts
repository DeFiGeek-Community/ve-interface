import { useEffect } from "react";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { useContractContext } from "lib/contexts/ContractContext";

export type UseUserCheckpointReturn = {
  writeFn: ReturnType<typeof useWriteContract>;
  waitFn: ReturnType<typeof useWaitForTransactionReceipt>;
  writeContract: () => void;
};

export default function useUserCheckpoint({
  callbacks,
}: {
  callbacks?: {
    onSuccessWrite?: (data: any) => void;
    onError?: (error: Error) => void;
    onSuccessConfirm?: (data: any) => void;
  };
}): UseUserCheckpointReturn {
  const { chain, address } = useAccount();
  const { addresses, abis } = useContractContext();

  const config = {
    address: addresses.Gauge as `0x${string}`,
    abi: abis.Gauge,
    functionName: "userCheckpoint" as const,
    args: [address || "0x0"],
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
