import { sum } from "lodash";
import type { Guard, Ninja } from "utils/types/character";
import { calculateApproachScoreAndOdds } from "./calculateApproachScoreAndOdds";

export function calculateStealthScoreAndOdds(ninja: Ninja, guard: Guard) {
    const sumOfGuardSkills = sum([
        guard.attributes.perception,
        guard.attributes.apprehension,
        guard.attributes.scouting,
    ]);
    const sumOfNinjaSkills = sum([
        ninja.attributes.mental.creativity,
        ninja.attributes.mental.positioning,
        ninja.attributes.mental.anticipation,
        ninja.attributes.physical.agility,
        ninja.attributes.physical.reflexes,
        ninja.attributes.physical.speed,
        ninja.attributes.physical.balance,
        ninja.attributes.subterfuge.stealth
    ]);

    return calculateApproachScoreAndOdds(sumOfNinjaSkills, sumOfGuardSkills, ninja.attributes.mental.decision);
}