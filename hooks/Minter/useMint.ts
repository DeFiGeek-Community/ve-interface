import { useEffect } from "react";
import {
  useSimulateContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { useContractContext } from "lib/contexts/ContractContext";

export default function useMint({
  address,
  onSuccessWrite,
  onError,
  onSuccessConfirm,
}: {
  address?: `0x${string}`;
  onSuccessWrite?: (data: any) => void;
  onError?: (error: Error) => void;
  onSuccessConfirm?: (data: any) => void;
}): {
  writeFn: ReturnType<typeof useWriteContract>;
  waitFn: ReturnType<typeof useWaitForTransactionReceipt>;
} {
  const { addresses, abis } = useContractContext();

  const config = {
    address: addresses.Minter as `0x${string}`,
    abi: abis.Minter,
  };
  const { data: claimConfig } = useSimulateContract({
    ...config,
    functionName: "mint",
    args: [addresses.Gauge],
    query: {
      enabled: !!address,
    },
  });

  const writeFn = useWriteContract({
    ...claimConfig,
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
    writeFn,
    waitFn,
  };
}
