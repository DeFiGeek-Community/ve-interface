export interface IConfig {
  TokenStartTimestamp: number;
  TokenDecimals: number;
  VestingPeriod: number;
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
    },
    11155111: {
      TokenStartTimestamp: 1705905204,
      TokenDecimals: 18,
      VestingPeriod: 31536000,
    },
  },
};
