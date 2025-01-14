# ve-interface

ve-factoryのフロントエンドインターフェースです。Next.js、wagmi、Chakra UIを使用して構築されています。

## 技術スタック

- **フレームワーク**: Next.js 14
- **スマートコントラクト連携**: wagmi v2, viem
- **UIライブラリ**: Chakra UI
- **状態管理**: TanStack Query (React Query)
- **グラフ表示**: Chart.js, react-chartjs-2
- **ウォレット接続**: Web3Modal
- **多言語対応**: react-i18next
- **開発言語**: TypeScript

## 必要要件

- Node.js >= 18.17.0
- npmまたはyarn

## セットアップ

1. リポジトリのクローン:
```bash
git clone https://github.com/DeFiGeek-Community/ve-interface
cd ve-interface
```

2. 依存関係のインストール:
```bash
npm install
# または
yarn install
```

3. 環境変数の設定:
`.env.example`ファイルを`.env`にコピーし、以下の環境変数を設定してください：

```bash
# Alchemyのプロジェクトキー
NEXT_PUBLIC_ALCHEMY_ID=your_alchemy_key

# WalletConnectのプロジェクトID
NEXT_PUBLIC_PROJECT_ID=your_walletconnect_project_id

# InfuraのプロジェクトID
NEXT_PUBLIC_INFURA_ID=your_infura_id
```

各APIキーは以下のサービスから取得できます：
- Alchemy: https://www.alchemy.com/
- WalletConnect: https://cloud.walletconnect.com/
- Infura: https://www.infura.io/

4. 開発サーバーの起動:
```bash
npm run dev
# または
yarn dev
```

## 主要機能

- ve-tokenのロック機能
- 重み付け投票システム
- 報酬の確認と請求
- マルチウォレット対応
- リアルタイムのブロックチェーンデータ表示

## スクリプト

- `npm run dev`: 開発サーバーの起動
- `npm run build`: プロダクションビルドの作成
- `npm run start`: プロダクションサーバーの起動
- `npm run lint`: ESLintによるコード検証
- `npm run format`: Prettierによるコードフォーマット

## プロジェクト構造

```
ve-interface/
├── components/     # UIコンポーネント
├── hooks/         # カスタムフック
│   ├── ScoreWeightController/ # スコア重み付けコントローラー関連のフック
│   ├── FeeDistributor/        # 手数料分配関連のフック
│   ├── Gauge/                 # ゲージ関連のフック
│   ├── Yamato/                # Yamatoプロトコル関連のフック
│   ├── Token/                 # トークン関連のフック
│   ├── Minter/                # ミンター関連のフック
│   ├── VotingEscrow/          # 投票エスクロー関連のフック
│   ├── Vesting/               # ベスティング関連のフック
│   └── useToastNotifications  # トースト通知用フック
├── lib/           # ユーティリティ、定数、コンテキスト
│   ├── constants/ # コントラクトABI、アドレス、設定
│   ├── connector/ # ブロックチェーン接続関連
│   └── contexts/  # Reactコンテキスト
├── pages/         # Next.jsページコンポーネント
└── public/        # 静的ファイル
```

