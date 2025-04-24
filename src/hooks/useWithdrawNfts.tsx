"use client";

import { useSimulateContract } from "wagmi";
import { useEffect } from "react";
import { PresaleContract } from "~/contracts/presale";

export const useWithdrawNfts = () => {
  const {
    data: withdrawNftsData,
    error,
    refetch,
    isFetching,
  } = useSimulateContract({
    ...PresaleContract,
    functionName: "withdrawNfts",
    args: [],
  });

  useEffect(() => {
    refetch().catch((e) => console.log(e));
  }, [refetch]);

  return { withdrawNftsData, isFetching, error };
};
