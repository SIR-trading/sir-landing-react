"use client";
import { Button } from "../ui/button";
import { CustomConnectButton } from "~/components/customConnectButton";
import { api } from "~/trpc/react";

const Contributions = () => {
  const rrr = api.presale.getUserContribution.useQuery(
    "0x7F0ee5770B203879F8558659d36ec514A49d03BC",
  );

  const { data, error } = rrr;
  console.log({
    data,
    error,
  });
  return (
    <div className="flex w-full flex-col items-center justify-center gap-1 rounded-lg text-sm md:w-2/3 md:justify-center">
      <div className="absolute top-4 right-4">
        <CustomConnectButton />
      </div>

      <div className="flex h-full w-full flex-col items-stretch justify-between gap-1 rounded-lg bg-[#ffffff15] p-3 md:flex-row">
        <div>Contribution:</div>
        <div>
          <span className="text-md font-semibold">{10000}</span>
          <span className="text-gray-suit-500 top-2 ml-1 text-xs">
            {"RRRR"}
          </span>
        </div>
      </div>

      <div className="bg-midGray flex h-full w-full flex-col items-center justify-between gap-1 rounded-lg bg-[#ffffff15] p-3 md:flex-row">
        <div>Token allocation:</div>
        <div className="">
          <div className="text-md flex flex-row items-center justify-center font-semibold">
            {/*<Tooltip content={`${10293} SIR + ${304} SIR bonus`}>*/}
            {/*    <QuestionMarkCircleIcon className="w-6 h-6 mr-2" />*/}
            {/*</Tooltip>*/}

            <div>
              <span className="text-md">{49393}</span>
              <span className="text-gray-suit-500 ml-1 text-xs font-normal">
                SIR
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-midGray flex h-full w-full flex-col items-stretch justify-between gap-1 rounded-lg bg-[#ffffff15] p-3 md:flex-row">
        <div>Number of locked NFTs:</div>
        {303030 > 0 && (
          <Button
            variant="outline"
            // disabled={isWithdrawing}
            // onClick={withdrawNFTs}
            className="withdraw-btn ring-red-accent hover:ring-black-russian-950 text-xs text-[#fca5a5] ring-1 hover:bg-[#f87171] hover:text-[#090522]"
          >
            withdraw
            {/*<Timer*/}
            {/*    startDate={saleStore.saleState.timeSaleEnded}*/}
            {/*    daysDuration={365}*/}
            {/*    noDays={false}*/}
            {/*/>*/}
          </Button>
        )}
        <div>
          <span className="text-md font-semibold">{39449}</span>
        </div>
      </div>
    </div>
  );
};

export default Contributions;
