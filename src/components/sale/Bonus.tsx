"use client";
import { useMemo } from "react";
import type { TContribution } from "~/lib/types/data";

const arrayOfFive = [0, 1, 2, 3, 4];

const Bonus = ({
  contributions,
  isBoostedAddress,
}: {
  contributions: TContribution;
  isBoostedAddress: boolean;
}) => {
  const bonus = useMemo(() => {
    return isBoostedAddress
      ? 5
      : (contributions.lockedMinedJpegs?.number || 0) +
          (contributions.lockedButerinCards?.number || 0);
  }, [isBoostedAddress, contributions]);

  const lockedNFTs = useMemo(() => {
    const data = contributions;
    const mj =
      data.lockedMinedJpegs?.ids
        ?.slice(0, data.lockedMinedJpegs.number)
        .map((id) => `MJ-${id}`) || [];
    const bt =
      data.lockedButerinCards?.ids
        ?.slice(0, data.lockedButerinCards.number)
        .map((id) => `Card-${id}`) || [];
    return mj.concat(bt);
  }, [contributions]);

  // Ensure the value is between 0 and 5
  const progressBlocks = useMemo(() => {
    return Math.min(5, Math.max(0, bonus));
  }, [bonus]);

  return (
    <div className="flex flex-col gap-2">
      <label className="font-bold">
        {progressBlocks}/5 Bonus Level (+{progressBlocks * 6}% SIR)
      </label>

      {!isBoostedAddress ? (
        <div
          id="progress-container"
          className="flex flex-row gap-2 rounded-xl bg-[#ffffff15] p-2"
        >
          {arrayOfFive.map((_, n) => (
            <div
              key={n}
              className={` ${n < progressBlocks ? "progress-active" : ""} bg-opacity-10 flex h-[50px] w-[50px] items-center justify-center rounded-lg bg-white`}
            >
              {n < progressBlocks && (
                <div className="flex flex-col items-center justify-center gap-1 rounded-lg text-xs font-bold text-black">
                  <span>{lockedNFTs[n]?.split("-")[0]}</span>
                  <span>{Number(lockedNFTs[n]?.split("-")[1]) + 1}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div
          id="progress-container"
          className="flex flex-row gap-2 rounded-xl bg-[#ffffff15] p-2"
        >
          {arrayOfFive.map((_, n) => (
            <div
              key={n}
              className="flex h-[50px] w-[50px] items-center justify-center rounded-lg bg-black/80"
            >
              <div className="flex flex-col items-center justify-center gap-1 rounded-lg text-xs font-bold text-black">
                {/* Empty div for boosted addresses */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bonus;
