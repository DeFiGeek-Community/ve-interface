export interface IConfig {
  TokenStartTimestamp: number;
  TokenDecimals: number;
  VestingPeriod: number;
  path: string;
  tokenName: string;
  veTokenName: string;
  initialReward: boolean;
  minterReward: boolean;
  feeReward: boolean;
  multiTokenFeeDistributor: boolean;
  checkpoint: boolean;
  rewardTokens: { name: string; address?: `0x${string}` }[];
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
  projectLogoPath: string;
  tokenLogoPath: string;
  backgroundImagePath: string;
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
  path: "/yamato",
  tokenName: "YMT",
  veTokenName: "veYMT",
  initialReward: true,
  minterReward: true,
  feeReward: true,
  multiTokenFeeDistributor: false,
  checkpoint: true,
  rewardTokens: [{ name: "ETH" }],
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
  projectLogoPath: "yamato/yamato_logo_title.svg",
  tokenLogoPath: "yamato/YMT_token.png",
  backgroundImagePath: "background_green.webp",
};

const txjpConfig: IConfig = {
  TokenStartTimestamp: 0,
  TokenDecimals: 8,
  VestingPeriod: 0,
  path: "/txjp",
  tokenName: "TXJP",
  veTokenName: "veTXJP",
  initialReward: false,
  minterReward: false,
  feeReward: true,
  multiTokenFeeDistributor: true,
  checkpoint: false,
  rewardTokens: [
    { name: "TXJP", address: "0xdca6BcCecd7C25C654DFD80EcF7c63731B12Df5e" },
    { name: "CJPY", address: "0xDED5F78d4fB19e935eb45dFf9912eB132F046782" },
  ],
  homeUrl: "https://defigeek.xyz/",
  tokenRewardsDocumentUrl: "https://defigeek.xyz/txjp/",
  veDocumentUrl: "https://defigeek.xyz/txjp/",
  themeColors: {
    backgroundColor: "#FFF", // 白
    primaryColor: "#C51B41", // 濃い朱色
    secondaryColor: "#FF7777", // 赤系
    secondaryLightColor: "#FCD2d2", //
    primaryText: "#818181", // ダークグレー
    buttonText: "#FFF", // 白
  },
  projectLogoPath: "txjp/DFGC_logo_lockup.webp",
  tokenLogoPath: "txjp/TXJP.png",
  backgroundImagePath: "background/Group_200.webp",
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
  txjp: {
    1: {
      ...txjpConfig,
    },
    11155111: {
      ...txjpConfig,
    },
  },
};
