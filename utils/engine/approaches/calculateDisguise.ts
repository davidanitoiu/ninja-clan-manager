import { sum } from "lodash";
import type { Guard, Ninja } from "utils/types/character";
import { calculateApproachScoreAndOdds } from "./calculateApproachScoreAndOdds";

export function calculateDisguiseScoreAndOdds(ninja: Ninja, guard: Guard) {
    const sumOfGuardSkills = sum([
        guard.attributes.perception,
        guard.attributes.apprehension,
    ]);
    const sumOfNinjaSkills = sum([
        ninja.attributes.mental.influence,
        ninja.attributes.mental.creativity,
        ninja.attributes.mental.positioning,
        ninja.attributes.mental.anticipation,
        ninja.attributes.mental.negotiation,
    ]);

    return calculateApproachScoreAndOdds(sumOfNinjaSkills, sumOfGuardSkills, ninja.attributes.mental.decision);
}