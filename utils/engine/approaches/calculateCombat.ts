import { reduce, sum } from "lodash";
import type { Guard, Ninja } from "utils/types/character";
import { calculateApproachScoreAndOdds } from "./calculateApproachScoreAndOdds";

export function calculateCombatScoreAndOdds(ninja: Ninja, guard: Guard) {
    const sumOfGuardSkills = sum([
        guard.attributes.handToHand,
        guard.attributes.determination,
        guard.attributes.apprehension,
        guard.attributes.speed,
        guard.attributes.stamina]);
    const sumOfNinjaSkills = sum([
        ninja.attributes.mental.aggression,
        ninja.attributes.mental.anticipation,
        ninja.attributes.mental.creativity,
        ninja.attributes.mental.positioning,
        ninja.attributes.combat.handToHand,
        reduce(ninja.attributes.physical, (acc, attribute) => acc + attribute, 0)

    ]);

    return calculateApproachScoreAndOdds(sumOfNinjaSkills, sumOfGuardSkills);
}
