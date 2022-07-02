import { reduce, sum } from "lodash";
import type { Guard, Ninja } from "utils/types/character";
import { calculateApproachScoreAndOdds } from "./calculateApproachScoreAndOdds";

// calculate ambush score and odds
export function calculateAmbushScoreAndOdds(ninja: Ninja, guard: Guard) {
    const sumOfGuardSkills = sum([
        guard.attributes.perception,
        guard.attributes.scouting,
        guard.attributes.handToHand,
    ]);
    const sumOfNinjaSkills = sum([
        ninja.attributes.mental.aggression,
        ninja.attributes.mental.anticipation,
        ninja.attributes.mental.creativity,
        ninja.attributes.mental.positioning,
        ninja.attributes.mental.scouting,
        ninja.attributes.combat.handToHand,
        reduce(ninja.attributes.physical, (acc, attribute) => acc + attribute, 0)

    ]);

    return calculateApproachScoreAndOdds(sumOfNinjaSkills, sumOfGuardSkills, ninja.attributes.mental.decision);
}

