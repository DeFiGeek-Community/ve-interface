export interface IConfig {
  TokenStartTimestamp: number;
  TokenDecimals: number;
  VestingPeriod: number;
  TokenName: string;
  veTokenName: string;
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
      TokenName: "YMT",
      veTokenName: "veYMT",
    },
    11155111: {
      TokenStartTimestamp: 1710832176,
      TokenDecimals: 18,
      VestingPeriod: 31536000,
      TokenName: "YMT",
      veTokenName: "veYMT",
    },
  },
};
