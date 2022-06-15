import { every, filter, random, update } from "lodash";
import { Dispatch, SetStateAction } from "react";
import { Ninja } from "utils/types/character";
import { Compound } from "utils/types/character/compound";
import { MissionOutcome, MissionResult } from "utils/types/events";

const CHANCE_TO_NOT_SPOT_GUARD: number = 5 // this is 5/20, and defaults to 25%
const DELAY_PROGRESS = 2500 // miliseconds

function determineOdds(firstValue: number, secondValue: number): boolean {
  return random(1, firstValue) < random(1, secondValue);
}

function luckRoll() {
  return random(1, 20);
}

function doesGuardSpotNinja(ninjaStealthScore: number, guardScoutingScore: number): boolean {
  return random(1, ninjaStealthScore) > random(1, guardScoutingScore);
}

function doesEscape(ninja: Ninja, compound: Compound) {
  return filter(compound, { alive: true }).every(guard => {
    return determineOdds((guard.attributes.apprehension + guard.attributes.acceleration) / 2, (ninja.reflexes + ninja.acceleration) / 2)
  })
}

export function calculateMissionOutcome(ninja: Ninja, compound: Compound, messageQueue: string[]): MissionOutcome {
  let missionResult = MissionResult.UNRESOLVED;
  let flees = false;
  let spotted = false;

  messageQueue.push('Your ninja begins the approach...');

  const sneakPastGuards = every(compound, (guard) => {
    const isGuardSpotted = determineOdds(CHANCE_TO_NOT_SPOT_GUARD, ninja.scouting)
    if (isGuardSpotted) {
      messageQueue.push('A guard was spotted. Careful now...');


      // lay trap
      const doesNinjaLayTrap = determineOdds(luckRoll(), ninja.decision);
      if (doesNinjaLayTrap) {
        messageQueue.push('Your Ninja has has decided to lay an ambush...');
        const isApproachedWhileLayingTrap = determineOdds(ninja.trapMaking, guard.attributes.pace);

        if (isApproachedWhileLayingTrap) {
          messageQueue.push('A guard is approaching!');
          const isSpottedWhileLayingTrap = determineOdds(ninja.stealth, guard.attributes.scouting);
          spotted = true;
          if (isSpottedWhileLayingTrap) {
            messageQueue.push('Your ninja was spotted while trying to lay the trap. He tries to flee.');
            flees = true;
            return false
          } else {
            guard.alive = false
            return true;
          }
        } else {
          guard.alive = false
          return true;
        }
      }

      // sneak past guard
    } else {
      messageQueue.push('He tries to sneak past the guard')
      const isNinjaSpotted = determineOdds(ninja.stealth, guard.attributes.scouting);
      if (isNinjaSpotted) {
        messageQueue.push('He was spotted!')
        spotted = true;
        const doesNinjaFight = determineOdds(luckRoll(), (ninja.decision + ninja.aggression + ninja.handToHand) / 3);
        if (doesNinjaFight) {
          messageQueue.push('Like a true warrior, your Ninja has decided to fight!')
          const doesNinjaWin = determineOdds(ninja.handToHand, guard.attributes.handToHand);
          if (doesNinjaWin) {
            messageQueue.push("The guard was eliminated.")
            spotted = false;
            guard.alive = false;
            return true;
          }
        }
        return false;
      } else {
        messageQueue.push('Your Ninja has is moving like a shadow. Unseen. Unheard.')
        return true;
      }
    }
  })

  if (compound.length === 0) {
    messageQueue.push("It appears the compound is unguarded. This will be child's play!");
  }

  const fled = flees ? doesEscape(ninja, compound) : false

  if (sneakPastGuards) {
    missionResult = MissionResult.SUCCESS
    messageQueue.push("Mission accomplished! Well done, Master Ninja!")
  } else if (fled) {
    missionResult = MissionResult.FAILED
    messageQueue.push("Oh no! Your ninja has fled. Shameful display!")
  } else if (!sneakPastGuards && !fled) {
    missionResult = MissionResult.EXECUTED
    messageQueue.push("My lord, your ninja has been captured and was executed by the enemy! This is a black day for our school!")
  }

  return {
    missionResult,
    spotted,
    fled
  }
}