// Types for HyperEVM Launch Allocations

export interface AllocationMetadata {
  generatedAt: string;
  totalSIR: string;
  totalSIRRaw: string;
  totalNFTs: number;
  totalAddresses: number;
  maxUint56: string;
  allocationDistribution: {
    lpAllocation: string;
    sirHolders: string;
    hypurrHolders: string;
    hyperevmContributors: string;
    treasury: string;
  };
  oldTreasury: string;
  newTreasury: string;
}

export interface VaultEquityEntry {
  teaBalance: string | number;
  apeBalance: string | number;
  teaEquitySIR: string | number;
  apeEquitySIR: string | number;
}

export interface EthereumSource {
  sirBalance?: string | number;
  stakedSIR?: {
    unlockedStake?: string | number;
    lockedStake?: string | number;
  };
  vaultEquity?: Record<string, VaultEquityEntry>;
  unclaimedLperRewards?: string | number;
  unclaimedContributorRewards?: string | number;
  unissuedContributorRewards?: string | number;
  uniswapV3Equity?: string | number;
  uniswapV3UnclaimedFees?: string | number;
  uniswapV3StakingRewards?: string | number;
  totalSIR?: string | number;
  isContract?: boolean;
}

export interface HypurrSource {
  nftCount: number;
}

export interface HyperEVMContributorSource {
  basisPoints: number;
}

export interface AllocationBreakdown {
  fromEthereum?: number;
  fromHypurr?: number;
  fromHyperEVMContributor?: number;
  fromTreasury?: number;
}

export interface AllocationSources {
  ethereum?: EthereumSource;
  hypurr?: HypurrSource;
  hyperevmContributor?: HyperEVMContributorSource;
}

export interface AddressAllocation {
  allocation: number;
  allocationPerc: string;
  sources: AllocationSources;
  allocationBreakdown: AllocationBreakdown;
}

export interface AllocationsData {
  metadata: AllocationMetadata;
  allocations: Record<string, AddressAllocation>;
}

export type SourceType = "ethereum" | "hypurr" | "hyperevmContributor" | "treasury";

export interface SourceInfo {
  type: SourceType;
  label: string;
  color: string;
  bgColor: string;
}
