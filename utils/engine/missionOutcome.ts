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

export function calculateMissionOutcome(ninja: Ninja, compound: Compound, setMessageQueue: Dispatch<SetStateAction<string[]>>): MissionOutcome {
  let flees = false;
  const outcome: MissionOutcome = {
    missionResult: MissionResult.UNRESOLVED,
    fled: false,
    spotted: false,
    assassinated: 0,
    trapped: 0,
    poisoned: 0,
    evaded: 0
  }

  setMessageQueue((prevValue) => [...prevValue, 'Your ninja begins the approach...']);

  const sneakPastGuards = every(compound, (guard) => {
    const isGuardSpotted = determineOdds(CHANCE_TO_NOT_SPOT_GUARD, ninja.scouting)
    if (isGuardSpotted) {
      setMessageQueue((prevValue) => [...prevValue, 'A guard was spotted. Careful now...']);


      // lay trap
      const doesNinjaLayTrap = determineOdds(luckRoll(), ninja.decision);
      if (doesNinjaLayTrap) {
        setMessageQueue((prevValue) => [...prevValue, 'Your Ninja has has decided to lay an ambush...']);
        const isApproachedWhileLayingTrap = determineOdds(ninja.trapMaking, guard.attributes.pace);

        if (isApproachedWhileLayingTrap) {
          setMessageQueue((prevValue) => [...prevValue, 'A guard is approaching!']);
          const isSpottedWhileLayingTrap = determineOdds(ninja.stealth, guard.attributes.scouting);
          outcome.spotted = true;
          if (isSpottedWhileLayingTrap) {
            setMessageQueue((prevValue) => [...prevValue, 'Your ninja was spotted while trying to lay the trap. He tries to flee.']);
            flees = true;

            return false
          } else {
            setMessageQueue((prevValue) => [...prevValue, 'The guard has fallen into our trap.']);
            outcome.trapped += 1;
            outcome.spotted = false;

            return true;
          }
        } else {
          setMessageQueue((prevValue) => [...prevValue, 'The guard has fallen into our trap.']);
          outcome.trapped += 1;
          outcome.spotted = false;

          return true;
        }
      }

      // sneak past guard
    } else {
      setMessageQueue((prevValue) => [...prevValue, 'He tries to sneak past the guard']);
      const isNinjaSpotted = determineOdds(ninja.stealth, guard.attributes.scouting);
      if (isNinjaSpotted) {
        setMessageQueue((prevValue) => [...prevValue, 'He was spotted!']);
        outcome.spotted = true;
        const doesNinjaFight = determineOdds(luckRoll(), (ninja.decision + ninja.aggression + ninja.handToHand) / 3);
        if (doesNinjaFight) {
          setMessageQueue((prevValue) => [...prevValue, 'Like a true warrior, your Ninja has decided to fight!']);
          const doesNinjaWin = determineOdds(ninja.handToHand, guard.attributes.handToHand);
          if (doesNinjaWin) {
            setMessageQueue((prevValue) => [...prevValue, "The guard was eliminated."]);
            outcome.spotted = false;
            outcome.assassinated += 1;
            return true;
          }
        }
        return false;
      } else {
        setMessageQueue((prevValue) => [...prevValue, 'Your Ninja has is moving like a shadow.', 'Unseen. Unheard.']);
        outcome.evaded += 1;
        return true;
      }

    }
    setMessageQueue((prevValue) => [...prevValue, 'On to the next target']);
  })

  if (compound.length === 0) {
    setMessageQueue((prevValue) => [...prevValue, "It appears the compound is unguarded. This will be child's play!"]);
  }

  outcome.fled = flees ? doesEscape(ninja, compound) : false

  if (sneakPastGuards) {
    outcome.missionResult = MissionResult.SUCCESS;
    outcome.spotted = false;
    setMessageQueue((prevValue) => [...prevValue, "Mission accomplished! Well done, Master Ninja!"]);
  } else if (outcome.fled) {
    outcome.missionResult = MissionResult.FAILED
    setMessageQueue((prevValue) => [...prevValue, "Oh no! Your ninja has fled. Shameful display!"]);
  } else if (!sneakPastGuards && !outcome.fled) {
    outcome.missionResult = MissionResult.EXECUTED
    setMessageQueue((prevValue) => [...prevValue, "My lord, your ninja has been executed!", "This is a black day for our school!"]);
  }

  return outcome
}