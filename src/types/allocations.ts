// Types for MegaETH Launch Allocations

export interface AllocationMetadata {
  generatedAt: string;
  maxUint16: string;
  totalAddresses: number;
  lpAllocationPercent: number;
  contributorAllocationPercent: number;
  fixedContributors: {
    count: number;
    totalBasisPoints: number;
    percentOfTotalIssuance: string;
    source: string;
  };
  weightedHolders: {
    count: number;
    remainingPercent: string;
  };
  tvlWeights: {
    sir: number;
    hyperSir: number;
  };
  totalTVL: number;
  treasury: {
    ethereum: string;
    hyperevm: string;
    megaeth: string;
  };
  sources: {
    ethereumSnapshot: string;
    hyperevmSnapshot: string;
    megaethContributors: string;
  };
  formula: string;
}

export interface StakedSIR {
  unlockedStake?: string;
  lockedStake?: string;
}

export interface VaultPosition {
  teaBalance?: string;
  apeBalance?: string;
  teaEquitySIR?: string;
  apeEquitySIR?: string;
}

export interface SourceBreakdown {
  sirBalance?: string;
  stakedSIR?: StakedSIR;
  vaultEquity?: Record<string, VaultPosition>;
  unclaimedLperRewards?: string;
  unclaimedContributorRewards?: string;
  unissuedContributorRewards?: string;
  uniswapV3Equity?: string;
  uniswapV3UnclaimedFees?: string;
  uniswapV3StakingRewards?: string;
}

export interface EthereumSourceSnapshot {
  originalAddress: string;
  percentage: string;
  totalSIR: string;
  breakdown?: SourceBreakdown;
}

export interface HyperEVMSourceSnapshot {
  originalAddress: string;
  percentage: string;
  totalSIR: string;
  breakdown?: SourceBreakdown;
}

export interface AllocationSources {
  ethereum?: EthereumSourceSnapshot;
  hyperevm?: HyperEVMSourceSnapshot;
}

export interface PercentageBreakdown {
  ethereumPercentage: string;
  hyperEVMPercentage: string;
  weightedPercentage: string;
}

// Fixed allocation (e.g., contributors)
export interface FixedAllocation {
  allocation: string;
  allocationPerc: string;
  type: "fixed";
  basisPointsOfTotal: number;
  percentOfTotalIssuance: string;
  percentOfContributorPool: string;
}

// Weighted allocation (e.g., token holders)
export interface WeightedAllocation {
  allocation: string;
  allocationPerc: string;
  type: "weighted";
  sources: AllocationSources;
  percentageBreakdown: PercentageBreakdown;
}

export type AddressAllocation = FixedAllocation | WeightedAllocation;

export interface AllocationsData {
  metadata: AllocationMetadata;
  allocations: Record<string, AddressAllocation>;
}

// Helper type guards
export function isFixedAllocation(allocation: AddressAllocation): allocation is FixedAllocation {
  return allocation.type === "fixed";
}

export function isWeightedAllocation(allocation: AddressAllocation): allocation is WeightedAllocation {
  return allocation.type === "weighted";
}

export type SourceType = "ethereum" | "hyperevm" | "megaethContributor" | "treasury";

export interface SourceInfo {
  type: SourceType;
  label: string;
  color: string;
  bgColor: string;
}
