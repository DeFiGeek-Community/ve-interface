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
  vote: boolean;
  rewardTokens: { name: string; address?: `0x${string}` | undefined }[];
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
    tertiaryColor?: string;
  };
  projectLogoPath: string;
  tokenLogoPath: string;
  backgroundImagePath: string;
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  ogImage: string;
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
  vote: true,
  rewardTokens: [{ name: "ETH" }],
  homeUrl: "https://v2.yamato.fi/#/",
  tokenRewardsDocumentUrl:
    "https://docs.yamato.fi/ymt-yamato-dao-token/toveymtniyorufmingubsuto",
  veDocumentUrl: "https://docs.yamato.fi/ymt-yamato-dao-token",
  themeColors: {
    backgroundColor: "#FCFAF2",
    primaryColor: "#5BAD92",
    secondaryColor: "#F9AEA5",
    secondaryLightColor: "#FAD9D6",
    primaryText: "#818181",
    buttonText: "#FCFAF2",
    tertiaryColor: "#ffd09f",
  },
  projectLogoPath: "image/yamato/yamato_logo_title.svg",
  tokenLogoPath: "image/yamato/YMT_token.png",
  backgroundImagePath: "image/yamato/background_green.webp",
  siteName: "Yamato VotingEscrow Interface",
  siteDescription: "VotingEscrow Interface for Yamato Protocol.",
  siteUrl: "https://app.yamato.fi/#/",
  ogImage: "image/yamato/og_yamato.png",
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
  vote: false,
  rewardTokens: [
    { name: "WETH", address: undefined },
    { name: "CJPY", address: undefined },
    { name: "CUSD", address: undefined },
    { name: "CEUR", address: undefined },
  ],
  homeUrl: "https://defigeek.xyz/",
  tokenRewardsDocumentUrl: "https://defigeek.xyz/txjp/",
  veDocumentUrl: "https://defigeek.xyz/txjp/",
  themeColors: {
    backgroundColor: "#FFF",
    primaryColor: "#C51B41",
    secondaryColor: "#FF7777",
    secondaryLightColor: "#FCD2d2",
    primaryText: "#818181",
    buttonText: "#FFF",
  },
  projectLogoPath: "image/txjp/DFGC_logo_lockup.webp",
  tokenLogoPath: "image/txjp/TXJP.png",
  backgroundImagePath: "image/background/Group_200.webp",
  siteName: "TXJP VotingEscrow Interface",
  siteDescription: "VotingEscrow Interface for TXJP.",
  siteUrl: "https://defigeek.xyz",
  ogImage: "image/txjp/DFGC_logo_banner02.png",
};

const pndConfig: IConfig = {
  TokenStartTimestamp: 0,
  TokenDecimals: 18,
  VestingPeriod: 0,
  path: "/pnd",
  tokenName: "PND",
  veTokenName: "vePND",
  initialReward: false,
  minterReward: false,
  feeReward: true,
  multiTokenFeeDistributor: true,
  checkpoint: false,
  vote: false,
  rewardTokens: [
    { name: "WETH", address: undefined },
    { name: "CJPY", address: undefined },
    // { name: "CUSD", address: undefined },
    // { name: "CEUR", address: undefined },
  ],
  homeUrl: "https://pnd.defigeek.xyz/",
  tokenRewardsDocumentUrl:
    "https://defigeek.gitbook.io/punodwo-document/pnd-pnd-dao-token",
  veDocumentUrl:
    "https://defigeek.gitbook.io/punodwo-document/pnd-pnd-dao-token",
  themeColors: {
    backgroundColor: "#f3f1f1",
    primaryColor: "#3B8593",
    secondaryColor: "#FF2E6C",
    secondaryLightColor: "rgba(234, 234, 234, 0.2)",
    primaryText: "#626060",
    buttonText: "#FFF",
  },
  projectLogoPath: "image/pnd/punodwoɔ-logo-285×60.png",
  tokenLogoPath: "image/pnd/PND.png",
  backgroundImagePath: "image/background/Group_390.webp",
  siteName: "PND VotingEscrow Interface",
  siteDescription: "VotingEscrow Interface for PND.",
  siteUrl: "https://pnd.defigeek.xyz/",
  ogImage: "",
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
    31337: {
      ...yamatoConfig,
      TokenStartTimestamp: 0,
    },
  },
  txjp: {
    1: {
      ...txjpConfig,
    },
    11155111: {
      ...txjpConfig,
    },
    31337: {
      ...txjpConfig,
    },
  },
  pnd: {
    1: {
      ...pndConfig,
    },
    11155111: {
      ...pndConfig,
    },
    31337: {
      ...pndConfig,
    },
  },
};
