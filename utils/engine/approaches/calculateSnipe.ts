import { sum } from "lodash";
import type { Guard, Ninja } from "utils/types/character";
import { calculateApproachScoreAndOdds } from "./calculateApproachScoreAndOdds";

export function calculateSnipeScoreAndOdds(ninja: Ninja, guard: Guard) {
    const sumOfGuardSkills = sum([
        guard.attributes.scouting,
        guard.attributes.speed,
        guard.attributes.ranged,
    ]);
    const sumOfNinjaSkills = sum([
        ninja.attributes.mental.creativity,
        ninja.attributes.mental.positioning,
        ninja.attributes.mental.anticipation,
        ninja.attributes.mental.scouting,
        ninja.attributes.physical.speed,
        ninja.attributes.physical.precision,
        ninja.attributes.physical.balance,
        ninja.attributes.subterfuge.stealth,
        ninja.attributes.combat.ranged,
    ]);

    return calculateApproachScoreAndOdds(sumOfNinjaSkills, sumOfGuardSkills);
}