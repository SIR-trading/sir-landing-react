import React, { useState, useMemo, useCallback, useEffect } from "react";
import data from "~/lib/new-allocations";
import { formatUnits, isAddress } from "viem";
import { useAccount } from "wagmi";
import { CustomConnectButton } from "~/components/customConnectButton";

type ValueType = number | string | boolean | bigint;
type FieldType = { label: string; value: string };

const DIGITS: Record<string, number> = {
  sir: 12,
  eth: 18,
  weth: 18,
  wbtc: 8,
  usdc: 6,
  usdt: 6,
};

const LABELS: Record<string, string> = {
  sir_balance: "SIR Balance",
  sir_liquidity_mining: "Unclaimed LPing SIR Rewards",
  sir_unminted_contributor: "Unclaimed Presale SIR",
  sir_staked: "Staked SIR",
  sir_sir: "SIR in Liquidity & Leverage Positions",
  sir_uniswapV2: "SIR in Uniswap V2 Pools",
  sir_uniswapV3: "SIR in Uniswap V3 Pools",
  SIR_TOTAL_BALANCE: "Total SIR Balance",
  eth_sir: "ETH in Liquidity & Leverage Positions",
  eth_uniswapV2: "ETH in Uniswap V2 Pools",
  eth_uniswapV3: "ETH in Uniswap V3 Pools",
  WETH_TOTAL_BALANCE: "Total ETH Balance",
  wbtc_sir: "BTC in Liquidity & Leverage Positions",
  usdc_sir: "USDC in Liquidity & Leverage Positions",
  usdt_sir: "USDT in Liquidity & Leverage Positions",
  SIR_ENTITLED: "SIR Entitled",
  allocationInBillionParts: "Allocation Relaunch (% of total supply)",
  allocationOld: "Previous Allocation",
};

const HIGHLIGHT_LABELS = [
  LABELS.SIR_TOTAL_BALANCE,
  LABELS.WETH_TOTAL_BALANCE,
  LABELS.SIR_ENTITLED,
  LABELS.allocationInBillionParts,
];

function formatFieldData(key: string, raw: ValueType): FieldType {
  let value: ValueType = "";
  let overrideLabel: string | undefined;

  if (
    typeof raw === "number" ||
    typeof raw === "boolean" ||
    isAddress(raw as string)
  ) {
    const num = Number(raw);
    if (key === "allocationInBillionParts") {
      value = num ? (num / 10_000_000).toPrecision(2).concat("%") : num;
      overrideLabel = "Allocation Relaunch";
    } else if (key === "allocationOld") {
      value = num ? (num / 100).toFixed(2).concat("%") : num;
      overrideLabel = "Previous Allocation";
    } else {
      value = raw;
    }
  } else if (typeof raw === "string") {
    const prefix = key.split("_")[0]?.toLowerCase();
    const stripped = raw.replace(/,/g, "");
    const prefixDigits = prefix ? DIGITS[prefix] : undefined;
    const units = prefixDigits
      ? formatUnits(BigInt(stripped), prefixDigits)
      : stripped;
    value = isNaN(Number(units))
      ? units
      : new Intl.NumberFormat("en-US").format(Number(units));
  }

  const label =
    LABELS[key] ??
    overrideLabel ??
    key
      .split("_")
      .map((w) => w[0]?.toUpperCase() + w.slice(1).toLowerCase())
      .join(" ");

  return { label, value: String(value) };
}

export default function Allocations() {
  const { address: connectedAddr, isConnected } = useAccount();
  const [walletAddress, setWalletAddress] = useState<string>();
  const [showZeroValues, setShowZeroValues] = useState(false);

  const formattedList = useMemo(
    () =>
      data.allocations.map((rec) =>
        Object.entries(rec)
          .filter(([k]) => k !== "allocationInBasisPoints")
          .map(([k, v]) => formatFieldData(k, v as ValueType)),
      ),
    [],
  );

  const filterOptions = useMemo(
    () => data.allocations.map((rec) => rec.address as string),
    [],
  );

  const foundRecord = useMemo(
    () =>
      formattedList.find((fields) =>
        fields.some(
          (f) =>
            f.label === "Address" &&
            f.value.toLowerCase() === walletAddress?.toLowerCase(),
        ),
      ),
    [formattedList, walletAddress],
  );

  const record = useMemo(() => {
    if (!foundRecord) return [];
    const clean = foundRecord.filter(
      (f) =>
        !["Iscontract", "Allocation In Basis Points", "Address"].includes(
          f.label,
        ),
    );
    return showZeroValues ? clean : clean.filter((f) => Number(f.value) !== 0);
  }, [foundRecord, showZeroValues]);

  const handleToggleWallet = useCallback(() => {
    if (!isConnected) return;
    if (walletAddress === connectedAddr) {
      setWalletAddress(undefined);
    } else {
      setWalletAddress(connectedAddr);
    }
  }, [connectedAddr, isConnected, walletAddress]);

  useEffect(() => {
    if (isConnected && connectedAddr) setWalletAddress(connectedAddr);
  }, [connectedAddr, isConnected]);

  return (
    <div className="mx-auto mt-6 w-full space-y-10">
      <form className="flex flex-col items-center gap-4">
        <input
          list="addr-list"
          value={walletAddress ?? ""}
          onChange={(e) => setWalletAddress(e.target.value)}
          placeholder="Select or enter an address"
          className="w-full max-w-md rounded border bg-transparent p-2"
        />
        <datalist id="addr-list" className="max-h-60 overflow-y-auto">
          {filterOptions.map((addr) => (
            <option key={addr} value={addr} />
          ))}
        </datalist>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showZeroValues}
            onChange={() => setShowZeroValues((v) => !v)}
          />
          Show zero values
        </label>

        {isConnected && (
          <button
            type="button"
            onClick={handleToggleWallet}
            className="text-xs text-gray-500 underline"
          >
            {walletAddress === connectedAddr
              ? "Don't use connected wallet"
              : "Use connected wallet"}
          </button>
        )}
      </form>

      {foundRecord ? (
        <div className="animated-height space-y-1 text-sm lg:min-w-xl">
          {record.map((f) => (
            <div
              key={f.label}
              className={`rounded-lg p-2 ${
                HIGHLIGHT_LABELS.includes(f.label)
                  ? "bg-white/15"
                  : "bg-white/5"
              }`}
            >
              <div className="grid grid-cols-[2fr_1fr] gap-2">
                <div className="text-left">{f.label}</div>
                <div className="text-right">{f.value}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4 py-4 text-center lg:p-8">
          {!walletAddress
            ? `Select an address${!isConnected ? " or connect wallet" : ""}`
            : "Wallet not found!"}
          {!isConnected && <CustomConnectButton />}
        </div>
      )}
    </div>
  );
}
