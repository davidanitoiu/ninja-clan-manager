import { ApproachOutcome } from "utils/engine/approaches"
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
  data: ApproachOutcome,
  story: string
}
