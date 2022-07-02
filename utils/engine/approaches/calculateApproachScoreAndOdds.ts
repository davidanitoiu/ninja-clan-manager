import { round } from "lodash";
import { Odds } from "./typesAndEnums";

export function calculateApproachScoreAndOdds(sumOfNinjaSkills: number, sumOfGuardSkills: number): Odds {
    let successChance:number = 0;
    const ninjaHasHigherSkill = sumOfNinjaSkills > sumOfGuardSkills;

    if (ninjaHasHigherSkill) {
        const odds = sumOfNinjaSkills / sumOfGuardSkills;
        const guardSuccessChance = 1 / odds;
        successChance = (1 - guardSuccessChance) * 100;
    } else {
        const odds = sumOfGuardSkills / sumOfNinjaSkills;
        successChance = (1 / odds) * 100;
    }

    return {
        successChance: round(successChance, 1),
        ninjaScore: sumOfNinjaSkills,
        guardScore: sumOfGuardSkills
    }
}