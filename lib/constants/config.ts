export interface IConfig {
  TokenStartTimestamp: number;
  TokenDecimals: number;
  VestingPeriod: number;
  tokenName: string;
  veTokenName: string;
  initialReward: boolean;
  minterReward: boolean;
  feeReward: boolean;
  checkpoint: boolean;
  homeUrl?: string;
  tokenRewardsDocumentUrl?: string;
  veDocumentUrl?: string;
}

export interface IEnvironmentConfig {
  [environmentName: string]: {
    [chainId: number]: IConfig;
  };
}

const yamatoConfig: IConfig = {
  TokenStartTimestamp: 0,
  TokenDecimals: 18,
  VestingPeriod: 31536000,
  tokenName: "YMT",
  veTokenName: "veYMT",
  initialReward: true,
  minterReward: true,
  feeReward: true,
  checkpoint: true,
  homeUrl: "https://yamato-interface.vercel.app/#/",
  tokenRewardsDocumentUrl:
    "https://docs.yamato.fi/ymt-yamato-dao-token/toveymtniyorufmingubsuto",
  veDocumentUrl: "https://docs.yamato.fi/ymt-yamato-dao-token",
};

export const environmentConfig: IEnvironmentConfig = {
  yamato: {
    1: {
      ...yamatoConfig,
      TokenStartTimestamp: 0,
    },
    11155111: {
      ...yamatoConfig,
      TokenStartTimestamp: 1710832176,
    },
  },
};
