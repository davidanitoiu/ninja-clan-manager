import { forEach, round } from 'lodash';
import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';
import { FaSnowflake } from 'react-icons/fa';
import { GiGrainBundle, GiShurikenAperture, GiTreasureMap } from 'react-icons/gi';
import { ImEye } from 'react-icons/im';
import { IoSkull } from 'react-icons/io5';
import { RiEyeCloseFill } from 'react-icons/ri';
import { calculateMissionOutcome, generateGuard, generateNinja } from 'utils/engine';
import type { Guard, Ninja } from 'utils/types/character';
import { MissionEvent, MissionOutcome, MissionResult } from 'utils/types/events';

const MissionPage: NextPage = () => {
    const ninja: Ninja = generateNinja(100);
    const compound: Guard[] = [generateGuard(30), generateGuard(30)];
    const [outcome, setOutcome] = useState<MissionOutcome>({
        missionResult: MissionResult.UNRESOLVED,
        spotted: false,
        fled: false,
        assassinated: 0,
        trapped: 0,
        evaded: 0,
        poisoned: 0
    })
    const [progress, updateProgress] = useState('');
    const [missionEvents, updateMissionEvents] = React.useState<MissionEvent[]>([]);

    async function delay(n: number) {
        return new Promise(function (resolve) {
            setTimeout(resolve, n * 2000);
        });
    }

    React.useEffect(() => {

        if (outcome.missionResult === MissionResult.UNRESOLVED) {
            forEach(missionEvents, async (missionEvent, i) => {
                await delay(i);

                updateProgress(missionEvent.story);
                setOutcome(missionEvent.data);
            })

        }
    }, [missionEvents, outcome.missionResult])

    // const updateNinja = ((event: React.ChangeEvent<HTMLInputElement>) => {
    //     event.preventDefault();
    //     const attributeInput = event.currentTarget;

    //     setNinja(currentValue => ({
    //         ...currentValue,
    //         [attributeInput.name]: attributeInput.value
    //     }))
    // })

    // const updateCompound = ((event: React.ChangeEvent<HTMLInputElement>) => {
    //     event.preventDefault();
    //     const attributeInput = event.currentTarget;
    //     const guardNumber = Number(attributeInput.getAttribute('data-guard-number'));

    //     setCompound(currentValue => {
    //         currentValue[guardNumber] = {
    //             ...currentValue[guardNumber],
    //             [attributeInput.name]: attributeInput.value
    //         }
    //         return [...currentValue]
    //     })
    // })

    // const addGuard = ((event: React.MouseEvent<HTMLButtonElement>) => {
    //     event.preventDefault();

    //     setCompound((currentValue: Guard[]) => {
    //         const newGuard = generateGuard(power);

    //         return [...currentValue, newGuard];
    //     })
    // })

    // const removeGuard = ((event: React.MouseEvent<HTMLButtonElement>) => {
    //     event.preventDefault();

    //     setCompound((currentValue: Guard[]) => currentValue.slice(0, currentValue.length - 1))
    // })

    const startMission = () => {
        calculateMissionOutcome(ninja, compound, updateMissionEvents)
    }

    const guardsPassed = React.useMemo(() => outcome.assassinated + outcome.evaded + outcome.poisoned + outcome.trapped, [outcome]);

    return (
        <>
            <Head>
                <title>Ninja Clan Manager - Mission</title>
                <meta name="description" content="Manager type game, inspired by Football Manager, but with Ninjas" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className='h-full w-full grid grid-cols-2 bg-gradient-to-br from-theme-black via-theme-black to-primary-dark'>
                <section id="mission-name" className='flex flex-col gap-8'>
                    <div className='items-center p-4 rounded'>
                        <p className='font-display text-4xl text-theme-white'>End of Divinity</p>
                    </div>
                    <div className='col-span-2 gap-2 px-4 rounded'>
                        <h2 className='text-primary font-display text-3xl pb-8 font-bold'>Objectives</h2>
                        <ul className='grid gap-2 px-2 text-theme-white font-display text-xl '>
                            <li><p className={'px-2 py-1 flex items-center gap-2 transition-colors'}><GiShurikenAperture className={outcome.missionResult === MissionResult.SUCCESS ? 'text-theme-white' : 'text-theme-black'} />Get hidden missive</p></li>
                            <li><p className={'px-2 py-1  flex items-center gap-2 transition-colors'}><GiShurikenAperture className={!outcome.spotted && (outcome.missionResult === MissionResult.SUCCESS) ? 'text-theme-white' : 'text-theme-black'} />Remain unseen</p></li>
                        </ul>
                    </div>
                    <section className='col-span-2'>

                        <div className="w-full bg-theme-white rounded-full progress-bar-background">
                            <div className="font-display text-theme-white progress-bar" style={{ width: `${[MissionResult.EXECUTED, MissionResult.CAPTURED].includes(outcome.missionResult) ? 0 : (round((guardsPassed / compound.length) * 100, 0) + '%')}` }} />
                            <div className='w-full grid place-items-center relative z-20'>
                                {missionEvents.length
                                    ? (
                                        <p className='text-theme-white font-display -mt-16 text-center max-w-md'>{progress}</p>
                                    ) : <button onClick={startMission} className="text-2xl text-secondary-light -mt-16 w-full font-display">Bring them Death</button>
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
                            <li><p className='flex items-center justify-between'>Spotted {outcome.spotted ? <ImEye /> : <RiEyeCloseFill />}</p></li>
                        </ul>
                    </div>
                    <div className='grid place-content-start gap-4 px-4  text-theme-white font-display text-2xl '>
                        <p className='title-border text-4xl'>Emperial Palace</p>
                        <ul className='grid gap-2 pl-4'>
                            <li><p className='flex justify-between'>Guards <span>{compound.length - guardsPassed}</span></p></li>
                        </ul>
                    </div>
                </section>


            </main>

        </>
    )
}

export default MissionPage;
