import { sum } from "lodash";
import type { Guard, Ninja } from "utils/types/character";
import { calculateApproachScoreAndOdds } from "./calculateApproachScoreAndOdds";


export function calculateTrapScoreAndOdds(ninja: Ninja, guard: Guard) {
    const sumOfGuardSkills = sum([
        guard.attributes.perception,
        guard.attributes.scouting,
        guard.attributes.speed,
        guard.attributes.stamina,
        guard.attributes.determination
    ]);
    const sumOfNinjaSkills = sum([
        ninja.attributes.mental.positioning,
        ninja.attributes.mental.anticipation,
        ninja.attributes.mental.scouting,
        ninja.attributes.physical.speed,
        ninja.attributes.physical.precision,
        ninja.attributes.subterfuge.stealth,
        ninja.attributes.subterfuge.trapMaking,
    ]);

    return calculateApproachScoreAndOdds(sumOfNinjaSkills, sumOfGuardSkills, ninja.attributes.mental.decision);
}