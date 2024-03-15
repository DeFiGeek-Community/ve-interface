import { useEffect } from "react";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
  useReadContract,
} from "wagmi";
import { erc20Abi } from "viem";
import { useContractContext } from "lib/contexts/ContractContext";

export type UseApproveReturn = {
  writeFn: ReturnType<typeof useWriteContract>;
  waitFn: ReturnType<typeof useWaitForTransactionReceipt>;
  readFn: ReturnType<typeof useReadContract>;
  writeContract: () => void;
};

export default function useApprove({
  amount,
  callbacks,
  enabled,
}: {
  amount?: bigint;
  callbacks?: {
    onSuccessWrite?: (data: any) => void;
    onError?: (error: Error) => void;
    onSuccessConfirm?: (data: any) => void;
  };
  enabled: boolean;
}): UseApproveReturn {
  const { chain, address: owner } = useAccount();
  const { addresses, refetchFlag } = useContractContext();

  const spender = addresses.VotingEscrow;
  const approveArgs: [`0x${string}`, bigint] = [spender, amount || BigInt(0)];
  const allowanceArgs: [`0x${string}`, `0x${string}`] = [
    owner || "0x0",
    spender,
  ];
  const isReady = owner && spender && chain && enabled;

  const config = {
    address: addresses.Token as `0x${string}`,
    abi: erc20Abi,
    functionName: "approve" as const,
    args: approveArgs,
  };

  const writeFn = useWriteContract({
    mutation: {
      onSuccess: callbacks?.onSuccessWrite,
      onError: callbacks?.onError,
    },
  });

  const writeContract = () => {
    if (isReady) writeFn.writeContract(config);
  };

  const waitFn = useWaitForTransactionReceipt({
    chainId: chain?.id,
    hash: writeFn?.data,
  });

  useEffect(() => {
    if (waitFn.isSuccess) {
      callbacks?.onSuccessConfirm?.(waitFn.data);
    } else if (waitFn.isError) {
      callbacks?.onError?.(waitFn.error);
    }
  }, [waitFn.isSuccess, waitFn.isError]);

  const readFn = useReadContract({
    address: addresses.Token as `0x${string}`,
    abi: erc20Abi,
    functionName: "allowance",
    args: allowanceArgs,
    query: { enabled },
  });

  useEffect(() => {
    readFn.refetch();
  }, [refetchFlag]); 

  return { writeFn, waitFn, readFn, writeContract };
}
