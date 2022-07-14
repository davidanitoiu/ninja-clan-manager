import { last, omit, random, round, sum, times } from 'lodash';
import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { FaSnowflake } from 'react-icons/fa';
import { GiGrainBundle, GiShurikenAperture, GiTreasureMap } from 'react-icons/gi';
import { ImEye } from 'react-icons/im';
import { IoSkull } from 'react-icons/io5';
import { RiEyeCloseFill } from 'react-icons/ri';
import { calculateMissionOutcome, generateGuard, generateNinja } from 'utils/engine';
import { Approach, ApproachOutcome } from 'utils/engine/approaches';
import type { Guard, Ninja } from 'utils/types/character';
import { MissionEvent, MissionOutcome, MissionResult } from 'utils/types/events';

const MissionPage: NextPage = () => {
    const [ninja, setNinja] = useState<Ninja>();

    useEffect(() => {
        const ninjaRosterJson = localStorage.getItem('ninjaRoster');

        //const ninjaRoster = (ninjaRosterJson) ? JSON.parse(ninjaRosterJson) as Ninja[] : [generateNinja(20)];
        const ninjaRoster = [generateNinja(100)];

        setNinja(ninjaRoster[0]);
    }, [])


    // fill the compound with a random number of guards with power levels between 10 and 70 using _.random()
    const compound:Guard[] = React.useMemo(() => times(random(10, 20), () => generateGuard(random(10, 70))),[]);

    const [outcome, setOutcome] = useState<MissionOutcome>({
        missionResult: MissionResult.UNRESOLVED,
        assassinated: 0,
        trapped: 0,
        evaded: 0,
        poisoned: 0
    })
    const [progress, updateProgress] = useState('');
    const [missionEvents, updateMissionEvents] = React.useState<MissionEvent[]>([]);
    const guardsLeft = compound.length - sum(Object.values(omit(outcome, 'missionResult')));

    async function delay(n: number) {
        return new Promise(function (resolve) {
            setTimeout(resolve, n * 2000);
        });
    }

    React.useEffect(() => {

        if (outcome.missionResult === MissionResult.UNRESOLVED) {
            missionEvents.forEach((missionEvent, i) => {
                // chunk story property into sentences by dot or comma
                const story = adjustStoryForReader(missionEvent.story, ninja!.personal.name);

                story.forEach((entry, j) => {
                    // delay until all stories from previous events have been read
                    delay(i * story.length + j).then(() => {
                        console.log({ i, j, totalDelay: i + j });
                        updateProgress(entry);
                        if (last(story) === entry) {
                            updateApproachOutcome(missionEvent);
                        }
                    });

                })
            })
        }

    }, [missionEvents])

    function updateApproachOutcome(missionEvent: MissionEvent) {
        //update outcome based on mission event after the story chunks were displayed
        if ([Approach.STEALTH, Approach.BRIBERY, Approach.DISGUISE, Approach.LOCKPICK, Approach.PICKPOCKET].includes(missionEvent.approachType) && missionEvent.approachOutcome === ApproachOutcome.SUCCESS) {
            setOutcome((prevOutcome: MissionOutcome) => ({ ...prevOutcome, evaded: prevOutcome.evaded + 1 }));
        } else if (missionEvent.approachType === Approach.TRAP && missionEvent.approachOutcome === ApproachOutcome.SUCCESS) {
            setOutcome((prevOutcome: MissionOutcome) => ({ ...prevOutcome, trapped: prevOutcome.trapped + 1 }));
        } else if (missionEvent.approachType === Approach.POISON && missionEvent.approachOutcome === ApproachOutcome.SUCCESS) {
            setOutcome((prevOutcome: MissionOutcome) => ({ ...prevOutcome, poisoned: prevOutcome.poisoned + 1 }));
        } else if ([Approach.COMBAT, Approach.AMBUSH, Approach.SNIPE].includes(missionEvent.approachType) && missionEvent.approachOutcome === ApproachOutcome.SUCCESS) {
            setOutcome((prevOutcome: MissionOutcome) => ({ ...prevOutcome, assassinated: prevOutcome.assassinated + 1 }));
        } else if (missionEvent.approachOutcome === ApproachOutcome.MISSION_SUCCESS) {
            setOutcome((prevOutcome: MissionOutcome) => ({ ...prevOutcome, missionResult: MissionResult.SUCCESS }));
        } else if (missionEvent.approachOutcome === ApproachOutcome.MISSION_FAILED) {
            setOutcome((prevOutcome: MissionOutcome) => ({ ...prevOutcome, missionResult: MissionResult.FAILED }));
        }
        //sum up the values from outcome without missionResult
        

    }

    function adjustStoryForReader(story: string, name: string): string[] {
        const formattedStory = story.replaceAll(/%s/g, name);
        // create an array of 7 word chunks based on the story
        const storyChunks = formattedStory.split(/[.,]/).filter(Boolean).map((chunk) => chunk.trim());
        // verify each chunk to make sure it isn't longer than 7 words, if it is, split it in half

        console.dir(storyChunks);

        return storyChunks;
    }

    const startMission = () => {
        if (!ninja) return;
        calculateMissionOutcome(ninja, compound, updateMissionEvents)
    }

    const guardsPassed = outcome.assassinated + outcome.evaded + outcome.poisoned + outcome.trapped;


    return !ninja ? <div>Loading...</div> : (
        <>
            <main className='h-full w-full grid grid-cols-2 bg-gradient-to-br from-theme-black via-theme-black to-primary-dark'>
                <section id="mission-name" className='flex flex-col gap-8'>
                    <div className='items-center p-4 rounded'>
                        <p className='font-display text-4xl text-theme-white'>End of Divinity</p>
                    </div>
                    <div className='col-span-2 gap-2 px-4 rounded'>
                        <h2 className='text-primary font-display text-3xl pb-8 font-bold'>Objectives</h2>
                        <ul className='grid gap-2 px-2 text-theme-white font-display text-xl '>
                            <li><p className={'px-2 py-1 flex items-center gap-2 transition-colors'}><GiShurikenAperture className={`${outcome.missionResult === MissionResult.SUCCESS ? 'text-primary' : 'text-secondary'}`} />Assassinate the Emperor</p></li>
                        </ul>
                    </div>
                    <section className='col-span-2'>

                        <div className="w-full bg-theme-white rounded-full progress-bar-background">
                            <div className="font-display text-theme-white progress-bar" style={{ width: `${[MissionResult.EXECUTED, MissionResult.CAPTURED].includes(outcome.missionResult) ? 0 : (round((guardsPassed / compound.length) * 100, 0) + '%')}` }} />
                            <div className="font-display text-theme-white progress-bar" style={{ width: `${[MissionResult.EXECUTED, MissionResult.CAPTURED].includes(outcome.missionResult) ? 0 : (round((guardsPassed / compound.length) * 100, 0) + '%')}` }} />
                            <div className='w-full grid place-items-center relative z-20'>
                                {missionEvents.length
                                    ? <p className='text-theme-white font-display -mt-52 text-center max-w-md'>{progress}</p>
                                    : <button onClick={startMission} className="text-2xl text-secondary-light -mt-52 w-full font-display">Bring them Death</button>
                                }
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className='font-display text-theme-white text-lg grid grid-cols-3 items-start ml-4'>
                            <p className='text-xl flex gap-2 items-center'><GiGrainBundle />800 Koku</p>
                            <p className='text-xl flex gap-2 items-center'><GiTreasureMap />Kyoto</p>
                            <p className='text-xl flex gap-2 items-center'><FaSnowflake /> Cold</p>
                        </div>
                    </section>
                </section>
                <section id="score-board" className="w-full grid grid-cols-2 gap-8 p-4 mt-">
                    <div className='grid place-content-start gap-4 px-4 text-theme-white font-display text-2xl'>
                        <div className='flex gap-2 items-baseline'><IoSkull className={`text-3xl ${outcome.missionResult === MissionResult.EXECUTED ? 'visible' : 'invisible'}`} /><p className={`title-border text-4xl`}>{ninja.personal.name}</p></div>
                        <ul className='grid gap-2 pl-4'>
                            <li><p className='flex justify-between'>Assassinated <span>{outcome.assassinated}</span></p></li>
                            <li><p className='flex justify-between'>Trapped <span>{outcome.trapped}</span></p></li>
                            <li><p className='flex justify-between'>Evaded <span>{outcome.evaded}</span></p></li>
                            <li><p className='flex justify-between'>Poisoned <span>{outcome.poisoned}</span></p></li>
                        </ul>
                    </div>
                    <div className='grid place-content-start gap-4 px-4  text-theme-white font-display text-2xl '>
                        <p className='title-border text-4xl'>Imperial Palace</p>
                        <ul className='grid gap-2 pl-4'>
                            <li><p className='flex justify-between'>Guards <span>{guardsLeft}</span></p></li>
                        </ul>
                    </div>
                    <div>
                        <p>{JSON.stringify(Object.values(omit(outcome, 'missionResult')))}</p>
                    </div>
                </section>


            </main>

        </>
    )
}

export default MissionPage;
