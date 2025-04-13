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
        { name: "CJPY", address: "0x8aEf8bC3b148C6163b85504B90718bF308d150ee" },
        { name: "CUSD", address: "0xBe6E51ac27CDF01Af63C6b4cAa9e1037bB2f72b7" },
        { name: "CEUR", address: "0x8aEf8bC3b148C6163b85504B90718bF308d150ee" },
      ],
    },
    31337: {
      FeeDistributor: "0x610178dA211FEF7D417bC0e6FeD39F05609AD788",
      GaugeController: "0xcbEAF3BDe82155F56486Fb5a1072cb8baAf547cc",
      Gauge: "0x5081a39b8A5f0E35a8D959395a630b68B74Dd30f",
      Minter: "0xB0D4afd8879eD9F52b28595d31B441D079B2Ca07",
      VotingEscrow: "0xc351628EB244ec633d5f21fBD6621e1a683B1181",
      Token: "0x7bc06c482DEAd17c0e297aFbC32f6e63d3846650",
      Vesting: "0x7969c5eD335650692Bc04293B07F5BF2e7A673C0",
      Yamato: "0x0B306BF915C4d645ff596e518fAf3F9669b97016",
      Score: [
        { name: "CJPY", address: "0x5081a39b8A5f0E35a8D959395a630b68B74Dd30f" },
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
  pnd: {
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
      FeeDistributor: "0x1905c152eaBD0BDd75c680199fA8Dc4cF916Ad53",
      GaugeController: "0x",
      Gauge: "0x",
      Minter: "0x",
      VotingEscrow: "0x0d5C5D543BAdD85aac8AC570c1Bd3797A2ceba43",
      Token: "0x96A1B843d0b256bCffe9E107b77aa38e1cBBDD5C",
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
