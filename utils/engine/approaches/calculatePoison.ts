import { sum } from "lodash";
import type { Guard, Ninja } from "utils/types/character";
import { calculateApproachScoreAndOdds } from "./calculateApproachScoreAndOdds";

export function calculatePoisonScoreAndOdds(ninja: Ninja, guard: Guard) {
    const sumOfGuardSkills = sum([
        guard.attributes.perception,
        guard.attributes.stamina,
    ]);
    const sumOfNinjaSkills = sum([
        ninja.attributes.mental.anticipation,
        ninja.attributes.subterfuge.stealth,
        ninja.attributes.subterfuge.poison,
        ninja.attributes.physical.precision,
        ninja.attributes.physical.speed,
    ]);

    return calculateApproachScoreAndOdds(sumOfNinjaSkills, sumOfGuardSkills, ninja.attributes.mental.decision);
}