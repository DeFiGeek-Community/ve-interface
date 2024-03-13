import { useEffect } from "react";
import {
  useAccount,
  useSimulateContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { LockType } from "lib/types/VotingEscrow";
import { useContractContext } from "lib/contexts/ContractContext";

export default function useLock({
  type,
  value,
  unlockTime,
  allowance,
  onSuccessWrite,
  onError,
  onSuccessConfirm,
}: {
  type: LockType;
  value: bigint; // BigからBigIntに変更
  unlockTime: number;
  allowance?: bigint; // BigからBigIntに変更
  onSuccessWrite?: (data: any) => void;
  onError?: (error: Error) => void;
  onSuccessConfirm?: (data: any) => void;
}): {
  prepareFn: ReturnType<typeof useSimulateContract>;
  writeFn: ReturnType<typeof useWriteContract>;
  waitFn: ReturnType<typeof useWaitForTransactionReceipt>;
} {
  const enabled = () => {
    switch (type) {
      case LockType.CREATE_LOCK:
        return (
          value > BigInt(0) &&
          (!allowance || allowance >= value) &&
          !!unlockTime &&
          unlockTime > new Date().getTime() / 1000
        );
      case LockType.INCREASE_AMOUNT:
        return value > BigInt(0) && (!allowance || allowance >= value);
      case LockType.INCREASE_UNLOCK_TIME:
        return !!unlockTime && unlockTime > new Date().getTime() / 1000;
    }
  };

  const args = (): (string | number)[] => {
    switch (type) {
      case LockType.CREATE_LOCK:
        return [value.toString(), unlockTime]; // BigIntを文字列に変換
      case LockType.INCREASE_AMOUNT:
        return [value.toString()]; // BigIntを文字列に変換
      case LockType.INCREASE_UNLOCK_TIME:
        return [unlockTime];
    }
  };

  const { chain } = useAccount();
  const { addresses, abis } = useContractContext();

  const prepareFn = useSimulateContract({
    address: addresses.VotingEscrow as `0x${string}`,
    abi: abis.VotingEscrow,
    functionName: type.toString(),
    args: args(),
    query: {
      enabled: enabled(),
    },
    chainId: chain?.id,
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
    hash: writeFn?.data,
    chainId: chain?.id,
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

  return {
    prepareFn,
    writeFn,
    waitFn,
  };
}
