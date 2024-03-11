import { useEffect } from "react";
import {
  useAccount,
  useSimulateContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useReadContract,
} from "wagmi";
import { erc20Abi } from "viem";
import { useState } from "react";
import { useContractContext } from "lib/contexts/ContractContext";

export default function useApprove({
  amount,
  onSuccessWrite,
  onError,
  onSuccessConfirm,
  enabled,
}: {
  amount?: bigint;
  onSuccessWrite?: (data: any) => void;
  onError?: (error: Error) => void;
  onSuccessConfirm?: (data: any) => void;
  enabled: boolean;
}): {
  prepareFn: any;
  writeFn: any;
  waitFn: ReturnType<typeof useWaitForTransactionReceipt>;
  allowance: bigint;
  refetchAllowance: () => Promise<any>;
} {
  const { chain, address: owner } = useAccount();
  const { addresses } = useContractContext();
  const [allowance, setAllowance] = useState<bigint>(BigInt(0));
  const spender = addresses.VotingEscrow;
  const approveArgs: [`0x${string}`, bigint] = [
    addresses.VotingEscrow,
    amount || BigInt(0),
  ];
  const allowanceArgs: [`0x${string}`, `0x${string}`] = [
    owner || "0x0",
    spender,
  ];
  const isReady: boolean = !!owner && !!spender && !!chain && enabled;

  const prepareFn = useSimulateContract({
    chainId: chain?.id,
    address: addresses.Token as `0x${string}`,
    abi: erc20Abi,
    functionName: "approve",
    args: approveArgs,
    query: {
      enabled: isReady,
    },
  });

  const writeFn = useWriteContract({
    mutation: {
      onSuccess(data) {
        onSuccessWrite && onSuccessWrite(data);
      },
      onError(e: Error) {
        onError && onError(e);
      },
    },
  });

  const waitFn = useWaitForTransactionReceipt({
    chainId: chain?.id,
    hash: writeFn?.data,
  });

  useEffect(() => {
    // 成功時
    if (waitFn.isSuccess) {
      onSuccessConfirm && onSuccessConfirm(waitFn.data);
    }

    // エラー時
    if (waitFn.isError) {
      onError && onError(waitFn.error);
    }
  }, [waitFn, onSuccessConfirm, onError]);

  const readFn = useReadContract({
    address: addresses.Token as `0x${string}`,
    abi: erc20Abi,
    functionName: "allowance",
    args: allowanceArgs,
    query: {
      enabled,
    },
  });

  return {
    prepareFn,
    writeFn,
    waitFn,
    allowance,
    refetchAllowance: readFn.refetch,
  };
}
