import { useEffect } from "react";
import {
  useSimulateContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { useContractContext } from "lib/contexts/ContractContext";

export default function useClaim({
  address,
  token,
  onSuccessWrite,
  onError,
  onSuccessConfirm,
}: {
  address: `0x${string}`;
  token: `0x${string}`;
  onSuccessWrite?: (data: any) => void;
  onError?: (error: Error) => void;
  onSuccessConfirm?: (data: any) => void;
}): {
  prepareFn: ReturnType<typeof useSimulateContract>;
  writeFn: ReturnType<typeof useWriteContract>;
  waitFn: ReturnType<typeof useWaitForTransactionReceipt>;
} {
  const { addresses, abis } = useContractContext();

  const prepareFn = useSimulateContract({
    address: addresses.FeeDistributor as `0x${string}`,
    abi: abis.FeeDistributor,
    functionName: "claim",
    args: [address, token],
    account: address,
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
