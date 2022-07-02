import { sum } from "lodash";
import { Guard, Ninja } from "utils/types/character";
import { calculateApproachScoreAndOdds } from "./calculateApproachScoreAndOdds";

// calculate bribery score and odds
export function calculateBriberyScoreAndOdds(ninja: Ninja, guard: Guard) {
    const sumOfGuardSkills = sum([
        guard.attributes.determination,
        guard.attributes.integrity
    ]);
    const sumOfNinjaSkills = sum([
        ninja.attributes.mental.decision,
        ninja.attributes.mental.negotiation,
        ninja.attributes.mental.creativity,
        ninja.attributes.mental.influence,
        ninja.attributes.mental.scouting
    ]);

    return calculateApproachScoreAndOdds(sumOfNinjaSkills, sumOfGuardSkills, ninja.attributes.mental.decision);
}
