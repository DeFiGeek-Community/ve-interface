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
  themeColors: {
    backgroundColor: string;
    primaryColor: string;
    secondaryColor: string;
    secondaryLightColor: string;
    primaryText: string;
    buttonText: string;
  };
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
  themeColors: {
    backgroundColor: "#FCFAF2", // 淡いクリーム色
    primaryColor: "#5BAD92", // 淡いグリーン
    secondaryColor: "#F9AEA5", // ピンク
    secondaryLightColor: "#FAD9D6", // 薄いピンク
    primaryText: "#818181", // ダークグレー
    buttonText: "#FCFAF2", // ダークグレー
  },
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
