import { Approach, ApproachOutcome } from "utils/engine/approaches"
import type { Compound, Ninja } from "../character"

export enum MissionResult {
  UNRESOLVED = "unresolved",
  FAILED = "failed",
  SUCCESS = "success",
  CAPTURED = "captured",
  EXECUTED = "executed",
}

export type MissionSetup = {
  ninja: Ninja,
  compound: Compound,
}

export type MissionEvent = {
  approachOutcome: ApproachOutcome,
  approachType: Approach,
  story: string
}

export type MissionOutcome = {
  missionResult: MissionResult,
  assassinated: number,
  trapped: number,
  evaded: number,
  poisoned: number

}