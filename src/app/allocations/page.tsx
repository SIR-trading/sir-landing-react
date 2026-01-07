"use client";
import { useState, useEffect, useMemo } from "react";
import { useAccount } from "wagmi";
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

  useEffect(() => {
    if (isConnected && connectedAddress) {
      setSearchTerm(connectedAddress);
    }
  }, [isConnected, connectedAddress]);

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
      <main className="min-h-screen bg-background px-4 py-24">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col items-center justify-center py-20">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-accent/20 border-t-accent" />
            <p className="mt-6 text-text-secondary">Loading allocations data...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error || !allocationsData) {
    return (
      <main className="min-h-screen bg-background px-4 py-24">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col items-center justify-center py-20">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
              <svg className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="mb-4 text-red-400">{error ?? "Failed to load allocations data"}</p>
            <button
              onClick={() => window.location.reload()}
              className="rounded-lg border border-accent/50 bg-accent/10 px-6 py-2 text-accent transition-all duration-300 hover:bg-accent/20"
            >
              Try Again
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="w-full bg-background-darker px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-accent to-transparent" />
          <h1 className="mb-4 font-geist text-4xl font-bold text-text-primary md:text-5xl">
            MegaSIR Allocations
          </h1>
          <p className="text-lg text-text-secondary">
            Find your allocation for the MegaETH launch
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="w-full bg-background px-4 py-16">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-xl border border-border bg-background-elevated p-8">
            <h2 className="mb-6 text-center text-xl font-semibold text-text-primary">
              Find Your Allocation
            </h2>

            <p className="mb-6 text-center text-sm text-text-secondary">
              Enter your wallet address to view your allocation details based on your
              Ethereum SIR, HyperEVM SIR holdings, and MegaETH contributor status.
            </p>

            {/* Search Input */}
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter wallet address (0x...)"
                className="w-full rounded-lg border border-border bg-background px-4 py-3 pl-12 text-text-primary placeholder-text-muted transition-all duration-300 focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/20"
              />
            </div>

            {/* Wallet Toggle */}
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
                className="mb-6 w-full text-center text-sm text-accent hover:underline"
              >
                {searchTerm === connectedAddress
                  ? "Clear connected wallet"
                  : "Use connected wallet"}
              </button>
            )}

            {/* Results */}
            {foundAllocation ? (
              <AllocationCardDisplay
                allocation={foundAllocation.allocation}
                address={foundAllocation.address}
                metadata={allocationsData.metadata}
              />
            ) : (
              <div className="flex flex-col items-center gap-4 rounded-lg border border-border bg-background py-8 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                  <Search className="h-6 w-6 text-accent" />
                </div>
                <p className="text-text-secondary">
                  {!searchTerm
                    ? `Enter an address${!isConnected ? " or connect your wallet" : ""}`
                    : "No allocation found for this address"}
                </p>
                {!isConnected && <CustomConnectButton />}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full bg-background-darker px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-2xl font-bold text-text-primary md:text-3xl">
            How Allocations Work
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                step: "A",
                title: "Launch on MegaETH",
                description:
                  "SIR is issued at a constant rate forever, with most new tokens flowing to liquidity providers.",
              },
              {
                step: "B",
                title: "Claim Anytime",
                description:
                  "Claim at any time over a three year window without dilution. Your percentage share is fixed.",
              },
              {
                step: "C",
                title: "Revenue Sharing",
                description:
                  "Stake SIR to receive a portion of protocol fees, automatically converted and paid in ETH.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="group rounded-xl border border-border bg-background-elevated p-6 transition-all duration-300 hover:border-accent/30"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-lg font-bold text-accent">
                  {item.step}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-text-primary">
                  {item.title}
                </h3>
                <p className="text-sm text-text-secondary">{item.description}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-text-secondary">
            See{" "}
            <a
              href="https://docs.sir.trading/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              the docs
            </a>{" "}
            for full distribution mechanics.
          </p>
        </div>
      </section>

      {/* Pie Chart Section */}
      <section className="w-full bg-background px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-center text-2xl font-bold text-text-primary md:text-3xl">
            Token Distribution
          </h2>
          <p className="mb-12 text-center text-text-secondary">
            Allocation breakdown for the MegaETH launch based on snapshot data
          </p>

          <div className="rounded-xl border border-border bg-background-elevated p-8">
            <AllocationMetadata
              metadata={allocationsData.metadata}
              allocationsData={allocationsData}
            />
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section className="w-full bg-background-darker px-4 py-12">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 h-px w-full max-w-xs mx-auto bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

          <p className="mb-2 text-sm text-text-secondary">
            <span className="text-text-muted">Snapshot:</span>{" "}
            {new Date(allocationsData.metadata.generatedAt).toLocaleString()}
          </p>

          <p className="mb-6 text-xs text-text-muted">
            This snapshot represents allocations at a specific point in time.
            Please verify your allocation details carefully.
          </p>

          <a
            href="/allocations/allocations.json"
            download
            className="inline-flex items-center gap-2 text-sm text-accent hover:underline"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Full Data (JSON)
          </a>
        </div>
      </section>
    </main>
  );
}
