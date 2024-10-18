export interface ISystemContractAddresses {
  FeeDistributor: `0x${string}`;
  GaugeController: `0x${string}`;
  Gauge: `0x${string}`;
  Minter: `0x${string}`;
  VotingEscrow: `0x${string}`;
  Token: `0x${string}`;
  Vesting: `0x${string}`;
  Yamato: `0x${string}`;
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
      Yamato: "0x",
    },
    11155111: {
      FeeDistributor: "0x55675B32dac1498845cA3D6DC39c60D4C306979d",
      GaugeController: "0x42b97a94460548eB1248EBEf8F3A0fDe33e78883",
      Gauge: "0x830F1F364583D694c2775CA26950084f2f483aeC",
      Minter: "0x7C3842EAd9fb95C7E81fbECad461f71009f8DcDC",
      VotingEscrow: "0xfF62eFe9097467Fb2B2adD94B2334764a57bD197",
      Token: "0x67bE87A96bF2306D0bc42c60EdAc51637b882eB9",
      Vesting: "0x17A6da7cd6eD06af8598b6EB4238119DcC958E32",
      Yamato: "0xEc8023Bd4BF08993C96F1f23dbE858b42F6A393F",
    },
  },
  txjp: {
    1: {
      FeeDistributor: "0x",
      GaugeController: "0x",
      Gauge: "0x",
      Minter: "0x",
      VotingEscrow: "0x",
      Token: "0x",
      Vesting: "0x",
      Yamato: "0x",
    },
    11155111: {
      FeeDistributor: "0x71C2BaefF9061530ACB7dEA31EE99d3cc9ba49A8",
      GaugeController: "0x",
      Gauge: "0x",
      Minter: "0x",
      VotingEscrow: "0x0651ABE642eFc46a4b9a6027B543eA7f875274f0",
      Token: "0xdca6BcCecd7C25C654DFD80EcF7c63731B12Df5e",
      Vesting: "0x",
      Yamato: "0x",
    },
  },
};
