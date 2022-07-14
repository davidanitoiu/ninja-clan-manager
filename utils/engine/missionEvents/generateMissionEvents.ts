import { random } from "lodash";
import App from "next/app";
import type { Ninja } from "utils/types/character";
import { MissionEvent } from "utils/types/events";
import { Approach, ApproachOutcome, CompoundApproachResults } from "../approaches";
import * as missionEventStrings from './missionEventStrings';

export function generateMissionEvents(ninja: Ninja, missionSuccess: boolean, compoundApproachResults: CompoundApproachResults): MissionEvent[] {
    const missionEvents: MissionEvent[] = compoundApproachResults.map(compoundApproachResult => {
        const approachOutcome = compoundApproachResult.success ? ApproachOutcome.SUCCESS : ApproachOutcome.FAILED;
        const approachType = compoundApproachResult.approach;
        const story = generateStory(approachOutcome, approachType);

        return {
            approachOutcome,
            approachType,
            story,
        }
    })

    const finalAssassinationEvent = generateFinalAssassinationEvent(missionSuccess)
    
    missionEvents.push

    console.dir(missionEvents);

    return missionEvents
}

function generateFinalAssassinationEvent(missionSuccess: boolean): MissionEvent {
    const validApproachTypes = [Approach.AMBUSH, Approach.COMBAT, Approach.POISON, Approach.TRAP, Approach.SNIPE];
    const randomApproach = validApproachTypes[random(0, validApproachTypes.length - 1)];

    return missionSuccess
        ? {
            approachOutcome: ApproachOutcome.MISSION_SUCCESS,
            approachType: randomApproach,
            // generateStory but replace the word 'guard' with the word 'target'
            story: generateStory(ApproachOutcome.SUCCESS, randomApproach).replaceAll('he guard', 'he target'),
        }
        : {
            approachOutcome: ApproachOutcome.MISSION_FAILED,
            approachType: randomApproach,
            story: generateStory(ApproachOutcome.FAILED, randomApproach).replaceAll('he guard', 'he target'),
        }

}

function generateStory(outcome: ApproachOutcome, approach: Approach): string {
    const randomStory = random(0, missionEventStrings[outcome][approach].length - 1);
    const storyTemplate = missionEventStrings[outcome][approach][randomStory] ?? 'Or maybe nothing happened...';

    return storyTemplate;
}