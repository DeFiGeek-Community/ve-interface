import { useEffect } from "react";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { LockType } from "lib/types/VotingEscrow";
import { useContractContext } from "lib/contexts/ContractContext";

export type UseLockReturn = {
  writeFn: ReturnType<typeof useWriteContract>;
  waitFn: ReturnType<typeof useWaitForTransactionReceipt>;
  writeContract: () => void;
  enabled: () => boolean;
};

export default function useLock({
  type,
  value,
  unlockTime,
  allowance,
  callbacks,
}: {
  type: LockType;
  value: bigint;
  unlockTime?: number;
  allowance?: bigint;
  callbacks?: {
    onSuccessWrite?: (data: any) => void;
    onError?: (error: Error) => void;
    onSuccessConfirm?: (data: any) => void;
  };
}): UseLockReturn {
  const { chain } = useAccount();
  const { addresses, abis } = useContractContext();

  const args = (): readonly (string | number | undefined)[] => {
    switch (type) {
      case LockType.CREATE_LOCK:
        return [value.toString(), unlockTime || 0];
      case LockType.INCREASE_AMOUNT:
        return [value.toString()];
      case LockType.INCREASE_UNLOCK_TIME:
        return [unlockTime || 0];
    }
  };

  const enabled = (): boolean => {
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

  const config = {
    address: addresses.VotingEscrow as `0x${string}`,
    abi: abis.VotingEscrow,
    functionName: type.toString(),
    args: args(),
  };

  const writeFn = useWriteContract({
    mutation: {
      onSuccess: callbacks?.onSuccessWrite,
      onError: callbacks?.onError,
    },
  });

  const writeContract = () => {
    if (enabled()) {
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
  }, [waitFn]);

  return {
    writeFn,
    waitFn,
    writeContract,
    enabled,
  };
}
