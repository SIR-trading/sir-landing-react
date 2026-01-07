"use client";
import { useState, useEffect, useMemo } from "react";
import { useAccount } from "wagmi";
import Section from "~/components/common/Section";
import { CustomConnectButton } from "~/components/customConnectButton";
import AllocationMetadata from "~/components/allocations/AllocationMetadata";
import AllocationCardDisplay from "~/components/allocations/AllocationCardDisplay";
import type { AllocationsData, AddressAllocation } from "~/types/allocations";
import { Search } from "lucide-react";

export default function MegaETHAllocationsPage() {
  const { address: connectedAddress, isConnected } = useAccount();
  const [allocationsData, setAllocationsData] =
    useState<AllocationsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Auto-populate search with connected wallet
  useEffect(() => {
    if (isConnected && connectedAddress) {
      setSearchTerm(connectedAddress);
    }
  }, [isConnected, connectedAddress]);

  // Fetch allocations data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/allocations/allocations.json");
        if (!response.ok) {
          throw new Error("Failed to fetch allocations data");
        }
        const data = (await response.json()) as AllocationsData;
        setAllocationsData(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, []);

  // Find the allocation for the searched address
  const foundAllocation = useMemo<{
    address: string;
    allocation: AddressAllocation;
  } | null>(() => {
    if (!allocationsData || !searchTerm) return null;

    const normalizedSearch = searchTerm.toLowerCase().trim();
    const entry = Object.entries(allocationsData.allocations).find(
      ([address]) => address.toLowerCase() === normalizedSearch
    );

    if (!entry) return null;

    return {
      address: entry[0],
      allocation: entry[1],
    };
  }, [allocationsData, searchTerm]);

  if (loading) {
    return (
      <div className="container">
        <Section variant="background">
          <div className="flex flex-col items-center justify-center py-20">
            <div className="spinner" />
            <p className="mt-4 text-text-secondary">
              Loading allocations data...
            </p>
          </div>
        </Section>
      </div>
    );
  }

  if (error || !allocationsData) {
    return (
      <div className="container">
        <Section variant="background">
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-red-500">
              {error ?? "Failed to load allocations data"}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Retry
            </button>
          </div>
        </Section>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Find Your Allocation Section */}
      <Section variant="background" header="Find Your MegaETH Allocation">
        <div className="section-text-block mb-6">
          <p>
            Enter your wallet address below to view your MegaETH allocation details.
            Your allocation is calculated based on your Ethereum SIR holdings, HyperEVM SIR holdings,
            and MegaETH contributor status at the time of the snapshot.
          </p>
        </div>
        <div className="mx-auto w-full max-w-lg space-y-6">
          {/* Search Form */}
          <div className="flex flex-col items-center gap-4">
            {/* Search Bar */}
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Select or enter an address"
                className="w-full rounded border border-gray-700 bg-transparent p-2 pl-9 text-sm text-text-primary placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Wallet Connection Toggle */}
            {isConnected && (
              <button
                type="button"
                onClick={() => {
                  if (searchTerm === connectedAddress) {
                    setSearchTerm("");
                  } else {
                    setSearchTerm(connectedAddress ?? "");
                  }
                }}
                className="text-xs text-gray-500 underline"
              >
                {searchTerm === connectedAddress
                  ? "Don't use connected wallet"
                  : "Use connected wallet"}
              </button>
            )}
          </div>

          {/* Allocation Display */}
          {foundAllocation ? (
            <AllocationCardDisplay
              allocation={foundAllocation.allocation}
              address={foundAllocation.address}
              metadata={allocationsData.metadata}
            />
          ) : (
            <div className="flex flex-col gap-4 py-4 text-center lg:p-8">
              {!searchTerm
                ? `Select an address${!isConnected ? " or connect wallet" : ""}`
                : "Wallet not found!"}
              {!isConnected && <CustomConnectButton />}
            </div>
          )}
        </div>
      </Section>

      {/* Allocations Pie Chart Section */}
      <Section variant="background" header="Allocations Pie Chart">
        <div className="section-text-block mb-8">
          <p>
            This page displays the <strong>token allocations</strong> for the
            MegaETH launch. The data represents a snapshot of all eligible
            addresses and their respective allocations based on their holdings
            across multiple sources.
          </p>
        </div>

        {/* Next Steps */}
        <div className="section-main mb-12">
          <div className="flex w-full flex-col items-center gap-8 md:flex-row md:items-start md:justify-evenly md:gap-6">
            {/* Step A */}
            <div className="flex flex-col flex-1 basis-0">
              <span className="relative grid place-items-center w-15 h-15 shrink-0 mx-auto">
                <span aria-hidden="true" className="neon-badge absolute inset-0"></span>
                <span className="absolute inset-0 flex items-center justify-center font-semibold">A</span>
              </span>
              <p className="text-justify text-balance hyphens-auto md:p-3">
                We launch on <strong>MegaETH</strong>. SIR is issued at a{" "}
                <strong>constant rate forever</strong>, with most new tokens flowing to{" "}
                <strong>liquidity providers</strong>, the core enablers whose deposits make every trade possible.
              </p>
            </div>

            {/* Step B */}
            <div className="flex flex-col flex-1 basis-0">
              <span className="relative grid place-items-center w-15 h-15 shrink-0 mx-auto">
                <span aria-hidden="true" className="neon-badge absolute inset-0"></span>
                <span className="absolute inset-0 flex items-center justify-center font-semibold">B</span>
              </span>
              <p className="text-justify text-balance hyphens-auto md:p-3">
                If you have an allocation, you can <strong>claim at any time over a three year window without dilution</strong>.
                Your percentage share is fixed, so the timing of your claim does not change what you earn.
              </p>
            </div>

            {/* Step C */}
            <div className="flex flex-col flex-1 basis-0">
              <span className="relative grid place-items-center w-15 h-15 shrink-0 mx-auto">
                <span aria-hidden="true" className="neon-badge absolute inset-0"></span>
                <span className="absolute inset-0 flex items-center justify-center font-semibold">C</span>
              </span>
              <p className="text-justify text-balance hyphens-auto md:p-3">
                SIR is a <strong>revenue sharing token</strong>. Stake to receive a portion of protocol fees,
                automatically converted and <strong>paid in ETH</strong>; see{" "}
                <a href="https://docs.sir.trading/" target="_blank" className="underline">
                  the docs
                </a>{" "}
                for the full distribution mechanics.
              </p>
            </div>
          </div>
        </div>

        <AllocationMetadata metadata={allocationsData.metadata} allocationsData={allocationsData} />
      </Section>

      {/* Footer */}
      <Section variant="background">
        <div className="section-text-block text-center">
          <p className="text-sm text-text-secondary">
            <strong>Generation Time:</strong>{" "}
            {new Date(allocationsData.metadata.generatedAt).toLocaleString()}
          </p>
          <p className="mt-4 text-xs text-text-secondary">
            <strong>Disclaimer:</strong> This snapshot represents allocations at
            a specific point in time. Please verify your allocation details
            carefully. For questions or concerns, please contact the team.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/allocations/allocations.json"
              download
              className="text-sm text-blue-500 hover:text-blue-400 underline"
            >
              Download Full Data (JSON)
            </a>
          </div>
        </div>
      </Section>
    </div>
  );
}
