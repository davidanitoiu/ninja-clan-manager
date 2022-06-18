import { Ninja } from "../character"
import { Compound, Guard } from "../character/compound"

export enum MissionResult {
  UNRESOLVED = "unresolved",
  FAILED = "failed",
  SUCCESS = "success",
  CAPTURED = "captured",
  EXECUTED = "executed"
}

export type MissionOutcome = {
    missionResult: MissionResult,
    spotted: boolean,
    fled: boolean,
    assassinated: number,
    trapped: number,
    evaded: number,
    poisoned: number,
  }
  
export type MissionSetup = {
  ninja: Ninja,
  compound: Compound,
}

export type MissionEvent = {
  data: MissionOutcome,
  story: string
}