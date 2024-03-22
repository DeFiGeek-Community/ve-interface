const ja = {
  TOTAL_OVERVIEW: "Total {{tokenName}} Overview",
  MY_PORTFOLIO: "My {{tokenName}} Portfolio",
  INITIAL_REWARD: "Initial Reward",
  CLAIM: "請求",
  BALANCE: "残高",
  CANCEL: "キャンセル",
  CONFIRMATION: "確認",
  EARLY_USER_REWARD: "初期リワード",
  EARLY_USER_REWARD_HELP:
    "初期リワードの報酬の量は、2024年〇月〇日〇時からスタートし、その時点では0%です。\n時間が経過するにつれ、この報酬の量は徐々に増加し、2025年〇月〇日〇時には、全額の100%を受け取ることが可能になります。\n報酬の受け取り可能量は時間が経つにつれて直線的に増えていきます。",
  ALLOCATED: "割当量",
  CLAIMED: "請求済み",
  CLAIMABLE: "請求可能",
  VE_TOKEN_REWARD_HELP:
    "{{tokenName}}を一定期間ロックすることで、移転不可の{{veTokenName}}を発行します。\nロック期間の最小単位は1週間、最大期間は4年間（208週）で、ロックした{{tokenName}}はロック期間終了まで引き出しできません。\n\n1{{tokenName}}を4年間ロックすると1{{veTokenName}}が発行され、時間経過により線形に減衰し、4年後に0{{veTokenName}}になります。",
  TOKEN_LOCK_NOTE:
    "注：{{tokenName}}ロック期間は最長4年間です。ロック期間中は{{tokenName}}を引き出すことができず、{{veTokenName}}は転送不可です。",
  VE_TOKEN_DECREASE_NOTE:
    "注：{{veTokenName}}はロック期間経過で逓減します。1{{tokenName}}を4年間ロックすると1{{veTokenName}}が発行され、4年後に0{{veTokenName}}になります。",
  TOKEN_LOCKED: "ロック中の{{tokenName}}",
  LOCKED_UNTIL: "ロック終了日時",
  REWARDS: "リワード",
  REWARDS_HELP:
    "{{veTokenName}}の保有者に対するリワードとして、{{tokenName}}の新規発行分とFee収入が各週開始時点の{{veTokenName}}保有額に応じて分配されます。",
  COMMING_SOON: "Comming soon...",
  TRANSACTION_SENT: "トランザクションを送信しました",
  TRANSACTION_CONFIRMED: "トランザクションが承認されました",
  APPROVAL_CONFIRMED: "トランザクションが承認されました",

  VE_CREATE_LOCK: "ロックする",
  APPROVE_TOKEN: "トークンを承認",
  VE_INCREASE_AMOUNT: "ロック額を増額",
  VE_INCREASE_UNLOCK_TIME: "ロック期間を延長",
  VE_WITHDRAW: "{{tokenName}}引き出し",
  INPUT_LOCK_AMOUNT: "ロック額",
  SELECT_UNLOCK_DATE: "ロック期間を選択",
  UNABLE_TO_LOCK_DATE: "入力された日付はロックできません。",
  INPUT_EXCEEDS_BALANCE: "入力が利用可能な残高を超えています。",
  TOTAL_TOKEN: "{{tokenName}}総供給量",
  TOTAL_TOKEN_VOTE_LOCKED: "投票ロックされた{{tokenName}}の合計",
  PERCENTAGE_TOKEN_LOCKED: "{{tokenName}}ロックの割合",
  TOTAL_VE_TOKEN: "{{veTokenName}}の合計",
};
export default ja;
