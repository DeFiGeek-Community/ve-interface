import { useEffect } from "react";
import {
  useAccount,
  useSimulateContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { useContractContext } from "lib/contexts/ContractContext";

export default function useWithdraw({
  onSuccessWrite,
  onError,
  onSuccessConfirm,
}: {
  onSuccessWrite?: (data: any) => void;
  onError?: (error: Error) => void;
  onSuccessConfirm?: (data: any) => void;
}): {
  prepareFn: ReturnType<typeof useSimulateContract>;
  writeFn: ReturnType<typeof useWriteContract>;
  waitFn: ReturnType<typeof useWaitForTransactionReceipt>;
} {
  const { chain, address } = useAccount();
  const { addresses, abis } = useContractContext();

  const prepareFn = useSimulateContract({
    address: addresses.VotingEscrow as `0x${string}`,
    abi: abis.VotingEscrow,
    functionName: "withdraw",
    query: {
      enabled: !!address,
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
