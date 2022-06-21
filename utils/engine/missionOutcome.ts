import { every, filter, random } from "lodash";
import { Dispatch, SetStateAction } from "react";
import { Ninja } from "utils/types/character";
import { Compound } from "utils/types/character/compound";
import { MissionEvent, MissionResult } from "utils/types/events";

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
    return determineOdds((guard.attributes.apprehension + guard.attributes.acceleration) / 2, (ninja.attributes.physical.reflexes + ninja.attributes.physical.acceleration) / 2)
  })
}

export function calculateMissionOutcome(ninja: Ninja, compound: Compound, updateMissionEvents: Dispatch<SetStateAction<MissionEvent[]>>): void {
  let flees = false;
  let fled = false;

  updateMissionEvents((prevValue) => [...prevValue, {
    data: {
      missionResult: MissionResult.UNRESOLVED,
      fled: false,
      spotted: false,
      assassinated: 0,
      trapped: 0,
      poisoned: 0,
      evaded: 0
    },
    story: 'Your ninja begins the approach...'
  }]);

  const sneakPastGuards = every(compound, (guard) => {
    const isGuardSpotted = determineOdds(CHANCE_TO_NOT_SPOT_GUARD, ninja.attributes.mental.scouting)
    if (isGuardSpotted) {
      updateMissionEvents((prevValue) => [...prevValue, {
        data: {
          ...prevValue[prevValue.length - 1].data,
        },
        story: 'A guard was spotted. Careful now...'
      }]);


      // lay trap
      const doesNinjaLayTrap = determineOdds(luckRoll(), ninja.attributes.mental.decision);
      if (doesNinjaLayTrap) {
        updateMissionEvents((prevValue) => [...prevValue, {
          data: {
            ...prevValue[prevValue.length - 1].data,
          },
          story: 'Your Ninja has has decided to lay an ambush...'
        }]);
        const isApproachedWhileLayingTrap = determineOdds(ninja.attributes.subterfuge.trapMaking, guard.attributes.pace);

        if (isApproachedWhileLayingTrap) {
          updateMissionEvents((prevValue) => [...prevValue, {
            data: {
              ...prevValue[prevValue.length - 1].data,
            },
            story: 'The guard is approaching!'
          }]);
          const isSpottedWhileLayingTrap = determineOdds(ninja.attributes.subterfuge.stealth, guard.attributes.scouting);
          if (isSpottedWhileLayingTrap) {
            updateMissionEvents((prevValue) => [...prevValue, {
              data: {
                ...prevValue[prevValue.length - 1].data,
                spotted: true
              },
              story: 'Your ninja was spotted while trying to lay the trap. He tries to flee.'
            }]);
            flees = true
            return false
          } else {
            updateMissionEvents((prevValue) => [...prevValue, {
              data: {
                ...prevValue[prevValue.length - 1].data,
                spotted: false,
                trapped: prevValue[prevValue.length - 1].data.trapped + 1
              },
              story: 'The guard has fallen into our trap.'
            }]);

            return true;
          }
        } else {
          updateMissionEvents((prevValue) => [...prevValue, {
            data: {
              ...prevValue[prevValue.length - 1].data,
              spotted: false,
              trapped: prevValue[prevValue.length - 1].data.trapped + 1
            },
            story: 'The guard has fallen into our trap.'
          }]);

          return true;
        }
      }

      // sneak past guard
    } else {
      updateMissionEvents((prevValue) => [...prevValue, {
        data: {
          ...prevValue[prevValue.length - 1].data,
        },
        story: 'He tries to sneak past the guard'
      }]);
      const isNinjaSpotted = determineOdds(ninja.attributes.subterfuge.stealth, guard.attributes.scouting);
      if (isNinjaSpotted) {
        updateMissionEvents((prevValue) => [...prevValue, {
          data: {
            ...prevValue[prevValue.length - 1].data,
            spotted: true
          },
          story: 'He was spotted!'
        }]);
        const doesNinjaFight = determineOdds(luckRoll(), (ninja.attributes.mental.decision + ninja.attributes.mental.aggression + ninja.attributes.combat.handToHand) / 3);
        if (doesNinjaFight) {
          updateMissionEvents((prevValue) => [...prevValue, {
            data: {
              ...prevValue[prevValue.length - 1].data,
            },
            story: 'Like a true warrior, your Ninja has decided to fight!'
          }]);
          const doesNinjaWin = determineOdds(ninja.attributes.combat.handToHand, guard.attributes.handToHand);
          if (doesNinjaWin) {
            updateMissionEvents((prevValue) => [...prevValue, {
              data: {
                ...prevValue[prevValue.length - 1].data,
                spotted: false,
                assassinated: prevValue[prevValue.length - 1].data.assassinated + 1
              },
              story: "The guard was eliminated."
            }]);

            return true;
          }
        }
        return false;
      } else {
        updateMissionEvents((prevValue) => [...prevValue, {
          data: {
            ...prevValue[prevValue.length - 1].data,
            evaded: prevValue[prevValue.length - 1].data.evaded + 1
          },
          story: 'Your Ninja has is moving like a shadow.',
        }]);

        updateMissionEvents((prevValue) => [...prevValue, {
          data: {
            ...prevValue[prevValue.length - 1].data,
          },
          story: 'Unseen. Unheard.'
        }]);

        return true;
      }

    }

    if (!flees) {
      updateMissionEvents((prevValue) => [...prevValue, {
        data: {
          ...prevValue[prevValue.length - 1].data,
        },
        story: 'On to the next target'
      }]);
    }
  })

  if (compound.length === 0) {
    updateMissionEvents((prevValue) => [...prevValue, {
      data: {
        ...prevValue[prevValue.length - 1].data,
      },
      story: "It appears the compound is unguarded. This will be child's play!"
    }]);
  }

  fled = flees ? doesEscape(ninja, compound) : false

  if (sneakPastGuards) {
    updateMissionEvents((prevValue) => [...prevValue, {
      data: {
        ...prevValue[prevValue.length - 1].data,
        spotted: false,
        missionResult: MissionResult.SUCCESS
      },
      story: "Mission accomplished. Well done, Master Ninja!"
    }]);
  } else if (fled) {
    updateMissionEvents((prevValue) => [...prevValue, {
      data: {
        ...prevValue[prevValue.length - 1].data,
        spotted: true,
        fled: true,
        missionResult: MissionResult.FAILED
      },
      story: "Oh no! Your ninja has fled. Shameful display!"
    }]);
  } else if (!sneakPastGuards && !fled) {
    updateMissionEvents((prevValue) => [...prevValue, {
      data: {
        ...prevValue[prevValue.length - 1].data,
        spotted: true,
        fled: false,
        missionResult: MissionResult.EXECUTED
      },
      story: "My lord, your ninja has been executed!"
    }]);

    updateMissionEvents((prevValue) => [...prevValue, {
      data: {
        ...prevValue[prevValue.length - 1].data,
      },
      story: "This is a black day for our school!"
    }]);
  }
}