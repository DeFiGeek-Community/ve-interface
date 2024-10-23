const en = {
  TOTAL_OVERVIEW: "Total {{tokenName}} Overview",
  MY_PORTFOLIO: "My {{tokenName}} Portfolio",
  INITIAL_REWARD: "Initial Reward",
  CLAIM: "Claim",
  BALANCE: "Balance",
  CANCEL: "Cancel",
  CONFIRMATION: "Confirmation",
  EARLY_USER_REWARD: "Early rewards",
  EARLY_USER_REWARD_HELP:
    "Early User Rewards: 1-year linear vesting from DD MM 2024",
  ALLOCATED: "Allocated",
  CLAIMED: "Claimed",
  CLAIMABLE: "Claimable",
  VE_TOKEN_REWARD: "{{veTokenName}} Rewards",
  VE_TOKEN_REWARD_HELP:
    "By locking {{tokenName}} for a certain period, non-transferable {{veTokenName}} is issued. The minimum unit of the lock period is one week, and the maximum period is 4 years (208 weeks), and the locked {{tokenName}} cannot be withdrawn until the end of the lock period. \n\nWhen 1 {{tokenName}} is locked for 4 years, 1 {{veTokenName}} is issued, which linearly decreases over time, and becomes 0 {{veTokenName}} after 4 years.",
  TOKEN_LOCK_NOTE:
    "Note: The maximum {{tokenName}} lock period is 4 years. During the lock period, {{tokenName}} cannot be withdrawn, and {{veTokenName}} is non-transferable.",
  VE_TOKEN_DECREASE_NOTE:
    "Note: {{veTokenName}} decreases over the lock period. When 1 {{tokenName}} is locked for 4 years, 1 {{veTokenName}} is issued, and it becomes 0 {{veTokenName}} after 4 years.",
  TOKEN_LOCKED: "{{tokenName}} Locked",
  LOCKED_UNTIL: "Locked until",
  REWARDS: "Rewards",
  REWARDS_HELP:
    "YMT rewards can be earned based on the CJPY borrowing balance in the Yamato Protocol. They are boosted by the amount of veYMT held and the collateral ratio.",
  FEE_REWARDS_HELP_YAMATO:
    "Fee rewards are distributed based on the amount of veYMT held, from the ETH collected through Yamato redemptions.",
  FEE_REWARDS_HELP:
    "Fee rewards are distributed based on the amount of {{veTokenName}} held.",
  COMMING_SOON: "Coming soon...",
  TRANSACTION_SENT: "Transaction sent!",
  TRANSACTION_CONFIRMED: "Transaction confirmed!",
  APPROVAL_CONFIRMED: "Approval confirmed!",

  VE_CREATE_LOCK: "Create lock",
  APPROVE_TOKEN: "Approve token",
  VE_INCREASE_AMOUNT: "Increase lock amount",
  VE_INCREASE_UNLOCK_TIME: "Extend lock period",
  VE_WITHDRAW: "Withdraw {{tokenName}}",
  INPUT_LOCK_AMOUNT: "Lock amount",
  SELECT_UNLOCK_DATE: "Select lock period",
  UNABLE_TO_LOCK_DATE: "The entered date cannot be locked.",
  INPUT_EXCEEDS_BALANCE: "Input exceeds available balance.",
  TOTAL_TOKEN: "Total {{tokenName}} supply",
  TOTAL_TOKEN_VOTE_LOCKED: "Total vote-locked {{tokenName}}",
  PERCENTAGE_TOKEN_LOCKED: "Percentage of {{tokenName}} locked",
  TOTAL_VE_TOKEN: "Total {{veTokenName}}",

  CHECKPOINT_TITLE: "User Checkpoint",
  CHECKPOINT_DESCRIPTION:
    "Calculates the user's current score and rewards, and updates to the latest state. Normally, it is executed automatically with each action, so there is no need to run it manually.",
  CHECKPOINT_ALERT:
    "To record the borrowing information of Yamato V1, executing the checkpoint for the first time is necessary. If not executed, rewards will not be reflected.",
  CHECKPOINT_BUTTON: "Execute User Checkpoint",
  UPDATE_SCORE_BUTTON: "Update Score",
  DESCRIPTION: "Documentation",
};
export default en;
