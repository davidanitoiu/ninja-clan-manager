import { forEach, map, maxBy, meanBy, minBy, random } from "lodash";
import { Dispatch, SetStateAction } from "react";
import type { Compound, Ninja } from "utils/types/character";
import { MissionEvent } from "utils/types/events";
import { ApproachOdds, CompoundApproachResults } from "./approaches";
import { calculateApproachOdds } from "./calculateApproach";
import { generateMissionEvents } from "./missionEvents";

export function calculateMissionOutcome(ninja: Ninja, compound: Compound, updateMissionEvents: Dispatch<SetStateAction<MissionEvent[]>>): void {
  const compoundApproachOdds: ApproachOdds[] = map(compound, guard => calculateApproachOdds(ninja, guard));
  const missionSuccess = meanBy(compoundApproachOdds, 'odds.successChance') > random(1, 100)

  // determine what events happened during the mission
  const compoundApproachResults = calculateMissionDetails(ninja, compoundApproachOdds, missionSuccess);

  // generate missionEvents based on missionSuccess and compoundApproachResults
  const missionEvents = generateMissionEvents(ninja, missionSuccess, compoundApproachResults);

  updateMissionEvents(missionEvents);
}

function calculateMissionDetails(ninja: Ninja, compoundApproachOdds: ApproachOdds[], missionSuccess: boolean): CompoundApproachResults {
  const compoundApproachResults: CompoundApproachResults = [];


  // for each guard in compoundApproachOdds, determine if the ninja was successful or not
  forEach(compoundApproachOdds, guardApproach => {
    // determine best approach if missionSuccess is true or worst approach if missionSuccess if false
    const chosenApproach = (missionSuccess
      ? maxBy(guardApproach, 'odds.successChance')
      : minBy(guardApproach, 'odds.successChance'))
      // pick a random one if undefined
      ?? guardApproach[random(0, guardApproach.length - 1)];

    compoundApproachResults.push({
      approach: chosenApproach.approach,
      success: (1 + (ninja.attributes.mental.decision / 10)) * (chosenApproach.odds.successChance) > random(1, 100),
    })

  })

  return compoundApproachResults

}