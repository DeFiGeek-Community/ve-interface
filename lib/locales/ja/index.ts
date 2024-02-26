const ja = {
  APP_NAME: "VotingEscrow",
  APP_DESCRIPTION: "Web3",
  CLAIM: "請求",
  BALANCE: "残高",
  CANCEL: "キャンセル",
  CONFIRMATION: "確認",
  EARLY_USER_REWARD: "初期ユーザリワード",
  EARLY_USER_REWARD_HELP:
    "初期ユーザは、YMTを報酬として受け取る権利が付与されます。\n\n初期ユーザリワードの予算5000万YMTがなくなり次第終了となり、予算が尽きている場合は権利を保有していても請求は出来ません。",
  ALLOCATED: "割当量",
  CLAIMED: "請求済み",
  CLAIMABLE: "請求可能",
  VE_YMT: "veYMT",
  VE_YMT_REWARD: "veYMTリワード",
  VE_YMT_REWARD_HELP:
    "YMTを一定期間ロックすることで、移転不可のveYMTを発行します。ロック期間の最小単位は1週間、最大期間は52週間(≒ 4年間)で、ロックしたYMTはロック期間終了まで引き出しできません。\n1YMTを4年間ロックすると1veYMTが発行され、時間経過により線形に減衰し、4年後に0veYMTになります。",
  YMT_LOCKED: "ロック中のYMT",
  LOCKED_UNTIL: "ロック終了日時",
  REWARDS: "リワード",
  REWARDS_HELP:
    "veYMTの保有者に対するリワードとして、YMTの新規発行分とオークションからのFee収入が各週開始時点のveYMT保有額に応じて分配されます。",
  COMMING_SOON: "Comming soon...",
  RAW_DATA: "トランザクションデータ",
  TEMPLATE: "テンプレート",
  TOO_SMALL_ALLOCATION:
    "トークンの割当て量が少なすぎるため、一部の参加者はトークンの割当てが0（最小単位より少ない額）になる可能性があります。割当てが0になった参加者は、返金の申請をすることができます。割当て量を増やすことを検討してください。各入札者へのトークン割り当ては、切り捨てで計算され、端数（最小単位より少ない額）の合計額は、永遠にコントラクトにロックされ、引き出しできないことにご注意ください。",
  TEMPLATE_EXPLANATION: "各テンプレートの説明 ",

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
