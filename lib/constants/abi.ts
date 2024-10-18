import FeePoolV2 from "lib/abis/yamato/FeePoolV2.json";
import ScoreWeightController from "lib/abis/yamato/ScoreWeightController.json";
import ScoreRegistry from "lib/abis/yamato/ScoreRegistry.json";
import YmtMinter from "lib/abis/yamato/YmtMinter.json";
import veYMT from "lib/abis/yamato/veYMT.json";
import YMT from "lib/abis/yamato/YMT.json";
import Vesting from "lib/abis/yamato/YmtVesting.json";
import Yamato from "lib/abis/yamato/Yamato.json";
import MultiTokenFeeDistributor from "lib/abis/factory/MultiTokenFeeDistributor.json";
import VeToken from "lib/abis/factory/VeToken.json";
import FaucetToken from "lib/abis/factory/FaucetToken.json";

export interface ISystemContractAbis {
  FeeDistributor: any[];
  GaugeController: any[];
  Gauge: any[];
  Minter: any[];
  VotingEscrow: any[];
  Token: any[];
  Vesting: any[];
  Yamato: any[];
}

export interface IVeSystemAbis {
  [systemName: string]: {
    [chainId: number]: ISystemContractAbis;
  };
}

export const veSystemAbis: IVeSystemAbis = {
  yamato: {
    1: {
      FeeDistributor: FeePoolV2,
      GaugeController: ScoreWeightController,
      Gauge: ScoreRegistry,
      Minter: YmtMinter,
      VotingEscrow: veYMT,
      Token: YMT,
      Vesting: Vesting,
      Yamato: Yamato,
    },
    11155111: {
      FeeDistributor: FeePoolV2,
      GaugeController: ScoreWeightController,
      Gauge: ScoreRegistry,
      Minter: YmtMinter,
      VotingEscrow: veYMT,
      Token: YMT,
      Vesting: Vesting,
      Yamato: Yamato,
    },
  },
  txjp: {
    1: {
      FeeDistributor: MultiTokenFeeDistributor,
      GaugeController: [],
      Gauge: [],
      Minter: [],
      VotingEscrow: VeToken,
      Token: FaucetToken,
      Vesting: [],
      Yamato: [],
    },
    11155111: {
      FeeDistributor: MultiTokenFeeDistributor,
      GaugeController: [],
      Gauge: [],
      Minter: [],
      VotingEscrow: VeToken,
      Token: FaucetToken,
      Vesting: [],
      Yamato: [],
    },
  },
};
