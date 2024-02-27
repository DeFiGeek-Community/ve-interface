const ja = {
  APP_NAME: "VotingEscrow",
  APP_DESCRIPTION: "Web3",
  CLAIM: "請求",
  BALANCE: "残高",
  CANCEL: "キャンセル",
  CONFIRMATION: "確認",
  EARLY_USER_REWARD: "初期ユーザリワード",
  EARLY_USER_REWARD_HELP:
    "初期リワードの量は、2024年〇月〇日〇時からスタートし、その時点では0%です。\n時間が経過するにつれ、この報酬の量は徐々に増加し、2025年〇月〇日〇時には、全額の100%を受け取ることが可能になります。\nこの増加は時間が経つにつれて均一で、報酬の受け取り可能量は直線的に増えていきます。",
  ALLOCATED: "割当量",
  CLAIMED: "請求済み",
  CLAIMABLE: "請求可能",
  VE_YMT: "veYMT",
  VE_YMT_REWARD: "veYMTリワード",
  VE_YMT_REWARD_HELP:
    "YMTを一定期間ロックすることで、移転不可のveYMTを発行します。\nロック期間の最小単位は1週間、最大期間は4年間（208週）で、ロックしたYMTはロック期間終了まで引き出しできません。\n\n1YMTを4年間ロックすると1veYMTが発行され、時間経過により線形に減衰し、4年後に0veYMTになります。",
  YMT_LOCK_NOTE:
    "注：YMTロック期間は最長4年間です。ロック期間中はYMTを引き出すことができず、veYMTは転送不可となります。",
  VE_YMT_DECREASE_NOTE:
    "注：veYMTはロック期間経過で逓減します。1YMTを4年間ロックすると1veYMTが発行され、4年後に0veYMTになります。",
  YMT_LOCKED: "ロック中のYMT",
  LOCKED_UNTIL: "ロック終了日時",
  REWARDS: "リワード",
  REWARDS_HELP:
    "veYMTの保有者に対するリワードとして、YMTの新規発行分とオークションからのFee収入が各週開始時点のveYMT保有額に応じて分配されます。",
  COMMING_SOON: "Comming soon...",

  // VotingEscrow
  VE_CREATE_LOCK: "ロックする",
  VE_INCREASE_AMOUNT: "ロック額を増額",
  VE_INCREASE_UNLOCK_TIME: "ロック期間を延長",
  VE_WITHDRAW: "引き出す",
  INPUT_LOCK_AMOUNT: "ロック額",
  SELECT_UNLOCK_DATE: "ロック期間を選択",

  TOTAL_YMT: "YMT総供給量",
  TOTAL_YMT_VOTE_LOCKED: "投票ロックされたYMTの合計",
  PERCENTAGE_YMT_LOCKED: "YMTロックの割合",
  TOTAL_VE_YMT: "veYMTの合計",
};
export default ja;
