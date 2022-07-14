import { sum } from "lodash";
import type { Guard, Ninja } from "utils/types/character";
import { calculateApproachScoreAndOdds } from "./calculateApproachScoreAndOdds";

export function calculateLockpickScoreAndOdds(ninja: Ninja, guard: Guard) {
    const sumOfGuardSkills = sum([
        guard.attributes.perception,
        guard.attributes.apprehension,
        guard.attributes.scouting,
        guard.attributes.speed
    ]);
    const sumOfNinjaSkills = sum([
        ninja.attributes.mental.positioning,
        ninja.attributes.mental.anticipation,
        ninja.attributes.physical.reflexes,
        ninja.attributes.subterfuge.stealth,
        ninja.attributes.subterfuge.lockpicking
    ]);

    return calculateApproachScoreAndOdds(sumOfNinjaSkills, sumOfGuardSkills);
}