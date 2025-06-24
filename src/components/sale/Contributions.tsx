"use client";
import { Button } from "../ui/button";
import { CustomConnectButton } from "~/components/customConnectButton";
import { api } from "~/trpc/react";
import { Stablecoin, type TContribution, type TToken } from "~/lib/types/data";
import { useCallback, useEffect, useMemo } from "react";
import { getTokenInfo, isBoostedAddress } from "~/utils/erc20";
import TooltipMain from "~/components/ui/tooltip";
import { CiCircleQuestion } from "react-icons/ci";
import Timer from "~/components/sale/Timer";
import { secondsInDay } from "date-fns/constants";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { useWithdrawNfts } from "~/hooks/useWithdrawNfts";
import Bonus from "~/components/sale/Bonus";

const formatNumber = (value: number, digits = 2) => {
  const factor = Math.pow(10, digits);
  const roundedValue = Math.floor(value * factor) / factor;
  return roundedValue.toLocaleString(undefined, {
    maximumFractionDigits: digits,
  });
};

const dummyContributions: TContribution = {
  stablecoin: 0,
  amountFinalNoDecimals: 0,
  amountWithdrawableNoDecimals: 0,
  timeLastContribution: 0,
  lockedButerinCards: {
    number: 0,
    ids: [0, 0, 0, 0, 0],
  },
  lockedMinedJpegs: {
    number: 0,
    ids: [0, 0, 0, 0, 0],
  },
};

// const user = "0x7F0ee5770B203879F8558659d36ec514A49d03BC";

const Contributions = () => {
  const { address: user, isConnected } = useAccount();

  const utils = api.useUtils();
  const { data: saleState } = api.presale.getState.useQuery();
  const { data: _contributions } = api.presale.getUserContribution.useQuery(
    user,
    {
      enabled: isConnected,
    },
  );

  const token = useMemo<TToken | null>(() => {
    const tIndex = _contributions?.stablecoin;
    if (tIndex === undefined) return null;
    const ticker = Stablecoin[tIndex] as keyof typeof Stablecoin;
    return getTokenInfo(ticker);
  }, [_contributions?.stablecoin]);

  const isNftLocked = useMemo(() => {
    if (!saleState?.timeSaleEnded) return true;
    const now = Math.floor(Date.now() / 1000);
    return now < saleState.timeSaleEnded + 365 * secondsInDay;
  }, [saleState?.timeSaleEnded]);

  const itemsLocked = useMemo(() => {
    const mj: number = _contributions?.lockedMinedJpegs?.number ?? 0;
    const bt: number = _contributions?.lockedButerinCards?.number ?? 0;
    return mj + bt;
  }, [
    _contributions?.lockedMinedJpegs?.number,
    _contributions?.lockedButerinCards?.number,
  ]);

  const tokenAllocation = useMemo(() => {
    const contributed = _contributions?.amountFinalNoDecimals ?? 0;
    const withdrawable = _contributions?.amountWithdrawableNoDecimals ?? 0;
    return (contributed + withdrawable) * 6045;
  }, [
    _contributions?.amountFinalNoDecimals,
    _contributions?.amountWithdrawableNoDecimals,
  ]);

  const bonusAllocation = useMemo(() => {
    const contributed = _contributions?.amountFinalNoDecimals ?? 0;
    const withdrawable = _contributions?.amountWithdrawableNoDecimals ?? 0;

    return (
      362.7 *
      (contributed + withdrawable) *
      (isBoostedAddress(user) ? 5 : itemsLocked)
    );
  }, [
    _contributions?.amountFinalNoDecimals,
    _contributions?.amountWithdrawableNoDecimals,
    itemsLocked,
    user,
  ]);

  const contributions = useMemo(
    () => _contributions ?? dummyContributions,
    [_contributions],
  );

  const { withdrawNftsData } = useWithdrawNfts();

  const { writeContract, data: hash, isPending, reset } = useWriteContract();
  const { isSuccess: isConfirmed, isLoading: isConfirming } =
    useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    if (isConfirmed) {
      reset();
      utils.presale.getUserContribution
        .invalidate()
        .catch((e) => console.log(e));
    }
  }, [isConfirmed, reset, utils.presale.getUserContribution]);

  const withdrawNFTs = useCallback(async () => {
    if (isNftLocked) return;
    if (itemsLocked === 0) return;
    if (isPending || isConfirming) return;
    if (withdrawNftsData?.request) {
      writeContract(withdrawNftsData.request);
    }
  }, [
    isConfirming,
    isNftLocked,
    isPending,
    itemsLocked,
    withdrawNftsData?.request,
    writeContract,
  ]);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-1 rounded-lg text-sm md:w-2/3 md:justify-center">
      <div className="absolute top-4 right-4">
        <CustomConnectButton />
      </div>

      <div className="flex h-full w-full flex-col items-stretch justify-between gap-1 rounded-lg bg-[#ffffff15] p-3 md:flex-row">
        <div>Contribution:</div>
        <div>
          <span className="text-md font-semibold">
            {formatNumber(contributions.amountFinalNoDecimals)}
          </span>
          <span className="text-gray-suit-500 top-2 ml-1 text-xs">
            {token?.name}
          </span>
        </div>
      </div>

      <div className="flex h-full w-full flex-col items-center justify-between gap-1 rounded-lg bg-[#ffffff15] p-3 md:flex-row">
        <div>Token allocation:</div>
        <div className="">
          <div className="text-md flex flex-row items-center justify-center font-semibold">
            <TooltipMain
              content={
                <>
                  {formatNumber(tokenAllocation, 0)} SIR +{" "}
                  {formatNumber(bonusAllocation, 0)} SIR bonus
                </>
              }
              trigger={<CiCircleQuestion className="mr-2 h-6 w-6" />}
            ></TooltipMain>

            <div>
              <span className="text-md">
                {formatNumber(tokenAllocation + bonusAllocation, 0)}
              </span>
              <span className="text-gray-suit-500 ml-1 text-xs font-normal">
                SIR
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-full w-full flex-col items-stretch justify-between gap-1 rounded-lg bg-[#ffffff15] p-3 md:flex-row">
        <div>Number of locked NFTs:</div>
        {itemsLocked > 0 && (
          <Button
            variant="outline"
            disabled={isNftLocked || isPending || isConfirming}
            onClick={withdrawNFTs}
            className="withdraw-btn ring-red-accent hover:ring-black-russian-950 text-xs text-[#fca5a5] ring-1 hover:bg-[#f87171] hover:text-[#090522]"
          >
            withdraw
            <Timer
              startDate={saleState?.timeSaleEnded ?? 0}
              daysDuration={365}
              noDays={false}
            />
          </Button>
        )}
        <div>
          <span className="text-md font-semibold">{itemsLocked}</span>
        </div>
      </div>
      <div className={"mt-6"}>
        <Bonus
          contributions={contributions}
          isBoostedAddress={isBoostedAddress(user)}
        />
      </div>
    </div>
  );
};

export default Contributions;
