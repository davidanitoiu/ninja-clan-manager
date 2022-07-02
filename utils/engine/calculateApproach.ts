import { Guard, Ninja } from "utils/types/character";
import { Approach, ApproachOdds, calculateAmbushScoreAndOdds, calculateBriberyScoreAndOdds, calculateCombatScoreAndOdds, calculateDisguiseScoreAndOdds, calculateLockpickScoreAndOdds, calculatePickpocketScoreAndOdds, calculatePoisonScoreAndOdds, calculateSnipeScoreAndOdds, calculateStealthScoreAndOdds, calculateTrapScoreAndOdds } from "./approaches";

export function calculateApproachOdds(ninja: Ninja, guard: Guard): ApproachOdds {
    return [
        {
            approach: Approach.AMBUSH,
            odds: calculateAmbushScoreAndOdds(ninja, guard),
        },
        {
            approach: Approach.COMBAT,
            odds: calculateCombatScoreAndOdds(ninja, guard),
        },
        {
            approach: Approach.BRIBERY,
            odds: calculateBriberyScoreAndOdds(ninja, guard),
        },
        {
            approach: Approach.DISGUISE,
            odds: calculateDisguiseScoreAndOdds(ninja, guard),
        },
        {
            approach: Approach.STEALTH,
            odds: calculateStealthScoreAndOdds(ninja, guard),
        },
        {
            approach: Approach.LOCKPICK,
            odds: calculateLockpickScoreAndOdds(ninja, guard),
        },
        {
            approach: Approach.PICKPOCKET,
            odds: calculatePickpocketScoreAndOdds(ninja, guard),
        },
        {
            approach: Approach.TRAP,
            odds: calculateTrapScoreAndOdds(ninja, guard),
        },
        {
            approach: Approach.POISON,
            odds: calculatePoisonScoreAndOdds(ninja, guard),
        },
        {
            approach: Approach.SNIPE,
            odds: calculateSnipeScoreAndOdds(ninja, guard),
        }
    ];

}