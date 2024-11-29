export interface ISystemContractAddresses {
  FeeDistributor: `0x${string}`;
  GaugeController: `0x${string}`;
  Gauge: `0x${string}`;
  Minter: `0x${string}`;
  VotingEscrow: `0x${string}`;
  Token: `0x${string}`;
  Vesting: `0x${string}`;
  Yamato: `0x${string}`;
  Score?: { name: string; address?: `0x${string}` }[];
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
      Score: [
        { name: "CJPY", address: "0x" },
        { name: "CUSD", address: "0x" },
        { name: "CEUR", address: "0x" },
      ],
    },
    31337: {
      FeeDistributor: "0x610178dA211FEF7D417bC0e6FeD39F05609AD788",
      GaugeController: "0x4C4a2f8c81640e47606d3fd77B353E87Ba015584",
      Gauge: "0x8198f5d8F8CfFE8f9C413d98a0A55aEB8ab9FbB7",
      Minter: "0xDC11f7E700A4c898AE5CAddB1082cFfa76512aDD",
      VotingEscrow: "0xdbC43Ba45381e02825b14322cDdd15eC4B3164E6",
      Token: "0x1fA02b2d6A771842690194Cf62D91bdd92BfE28d",
      Vesting: "0x5081a39b8A5f0E35a8D959395a630b68B74Dd30f",
      Yamato: "0x0B306BF915C4d645ff596e518fAf3F9669b97016",
      Score: [
        { name: "CJPY", address: "0x8198f5d8F8CfFE8f9C413d98a0A55aEB8ab9FbB7" },
        { name: "CUSD", address: "0x5fc748f1FEb28d7b76fa1c6B07D8ba2d5535177c" },
        { name: "CEUR", address: "0x74Cf9087AD26D541930BaC724B7ab21bA8F00a27" },
      ],
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
    31337: {
      FeeDistributor: "0x",
      GaugeController: "0x",
      Gauge: "0x",
      Minter: "0x",
      VotingEscrow: "0x",
      Token: "0x",
      Vesting: "0x",
      Yamato: "0x",
    },
  },
};
