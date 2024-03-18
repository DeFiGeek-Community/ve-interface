import { useEffect } from "react";
import {
  useAccount,
  useSimulateContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { useContractContext } from "lib/contexts/ContractContext";

export type UseMintReturn = {
  prepareFn: ReturnType<typeof useSimulateContract> & {
    data?: {
      result?: bigint;
    };
  };
  writeFn: ReturnType<typeof useWriteContract>;
  waitFn: ReturnType<typeof useWaitForTransactionReceipt>;
  writeContract: () => void;
};

export default function useMint({
  callbacks,
}: {
  callbacks?: {
    onSuccessWrite?: (data: any) => void;
    onError?: (error: Error) => void;
    onSuccessConfirm?: (data: any) => void;
  };
}): UseMintReturn {
  const { chain, address } = useAccount();
  const { addresses, abis } = useContractContext();

  const config = {
    address: addresses.Minter as `0x${string}`,
    abi: abis.Minter,
    functionName: "mint",
    args: [addresses.Gauge],
    chainId: chain?.id,
  };

  const prepareFn = useSimulateContract({
    ...config,
    query: {
      enabled: !!address,
    },
  }) as ReturnType<typeof useSimulateContract> & {
    data?: {
      result?: bigint;
    };
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
    prepareFn,
    writeFn,
    waitFn,
    writeContract,
  };
}
