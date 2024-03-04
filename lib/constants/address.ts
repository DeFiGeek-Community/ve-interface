export interface ISystemContractAddresses {
  FeeDistributor: `0x${string}`;
  GaugeController: `0x${string}`;
  Gauge: `0x${string}`;
  Minter: `0x${string}`;
  VotingEscrow: `0x${string}`;
  Token: `0x${string}`;
  Vesting: `0x${string}`;
}

export interface IVeSystemContracts {
  [systemName: string]: {
    [chainId: number]: ISystemContractAddresses;
  };
}

export const veSystemContracts: IVeSystemContracts = {
  yamato: {
    1: {
      FeeDistributor: "0x",
      GaugeController: "0x",
      Gauge: "0x",
      Minter: "0x",
      VotingEscrow: "0x",
      Token: "0x",
      Vesting: "0x",
    },
    11155111: {
      FeeDistributor: "0x9F1624Ccd194568a50e8c7E87e4cCb4c7FC43f6a",
      GaugeController: "0x343356d792D4694F65fe7d4e5B9a8417cad60989",
      Gauge: "0xb795862c2A13E55651b564f31a260ac219c446d3",
      Minter: "0xc2458303110abc9588D554e09089D6C5e56aa173",
      VotingEscrow: "0x7E74696d17A99dF06a902b69b6925B4D92C8311D",
      Token: "0x0159623e92D6a06Bb591d8A03832D1410cf76772",
      Vesting: "0x9CfF5F2198966F95cB5D6AEA38e1E2eF802b04e4",
    },
  },
};
