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
  tokenRewardsDocumentationUrl?: string;
}

export interface IEnvironmentConfig {
  [environmentName: string]: {
    [chainId: number]: IConfig;
  };
}

export const environmentConfig: IEnvironmentConfig = {
  yamato: {
    1: {
      TokenStartTimestamp: 0,
      TokenDecimals: 18,
      VestingPeriod: 31536000,
      tokenName: "YMT",
      veTokenName: "veYMT",
      initialReward: true,
      minterReward: true,
      feeReward: true,
      checkpoint: true,
      homeUrl: "",
      tokenRewardsDocumentationUrl: "https://docs.yamato.fi/ymt-yamato-dao-token/toveymtniyorufmingubsuto",
    },
    11155111: {
      TokenStartTimestamp: 1710832176,
      TokenDecimals: 18,
      VestingPeriod: 31536000,
      tokenName: "YMT",
      veTokenName: "veYMT",
      initialReward: true,
      minterReward: true,
      feeReward: true,
      checkpoint: true,
      homeUrl: "https://yamato-interface.vercel.app/#/",
      tokenRewardsDocumentationUrl: "https://docs.yamato.fi/ymt-yamato-dao-token/toveymtniyorufmingubsuto",
    },
  },
};
