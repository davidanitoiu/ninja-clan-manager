export enum Approach {
    AMBUSH = "ambush",
    COMBAT = "combat",
    STEALTH = "stealth",
    BRIBERY = "bribery",
    TRAP = "trap",
    PICKPOCKET = "pickpocket",
    LOCKPICK = "lockpick",
    POISON = "poison",
    SNIPE = "snipe",
    DISGUISE = "disguise",
}

export enum ApproachOutcome {
    SUCCESS = "success",
    FAILED = "failure",
    MISSION_SUCCESS = "missionSuccess",
    MISSION_FAILED = "missionFailure",
}

export type Odds = {
    ninjaScore: number,
    guardScore: number,
    successChance: number,
}

export type ApproachOdds = {
    approach: Approach,
    odds: Odds
}[]

export type CompoundApproachResults = {
    approach: Approach,
    success: boolean,
}[]