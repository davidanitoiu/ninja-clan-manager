import Compound from 'components/Compound';
import { capitalize, forEach, map } from 'lodash';
import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';
import { GiShurikenAperture, GiTreasureMap, GiGrainBundle } from 'react-icons/gi';
import { FaSnowflake } from 'react-icons/fa';
import { calculateMissionOutcome, generateGuard, generateNinja } from 'utils/engine';
import type { Guard, Ninja } from 'utils/types/character';
import { MissionOutcome, MissionResult } from 'utils/types/events';


const MissionPage: NextPage = () => {
    const [ninja, setNinja] = useState<Ninja>(generateNinja(100));
    const [compound, setCompound] = useState<Guard[]>([]);
    const [outcome, setOutcome] = useState<MissionOutcome>({
        missionResult: MissionResult.UNRESOLVED,
        spotted: false,
        fled: false
    })
    const [power, setPower] = useState(100);
    const [progress, updateProgress] = useState('');

    const [messageQueue, setMessageQueue] = React.useState<string[]>([]);

    async function delay(n: number) {
        return new Promise(function (resolve) {
            setTimeout(resolve, n * 2000);
        });
    }

    React.useEffect(() => {
        if (outcome.missionResult !== MissionResult.UNRESOLVED) {
            forEach(messageQueue, async (message, i) => {
                await delay(i);

                updateProgress(message);
            })

        }
    }, [outcome])

    const updateNinja = ((event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const attributeInput = event.currentTarget;

        setNinja(currentValue => ({
            ...currentValue,
            [attributeInput.name]: attributeInput.value
        }))
    })

    const updateCompound = ((event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const attributeInput = event.currentTarget;
        const guardNumber = Number(attributeInput.getAttribute('data-guard-number'));

        setCompound(currentValue => {
            currentValue[guardNumber] = {
                ...currentValue[guardNumber],
                [attributeInput.name]: attributeInput.value
            }
            return [...currentValue]
        })
    })

    const addGuard = ((event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        setCompound((currentValue: Guard[]) => {
            const newGuard = generateGuard(power);

            return [...currentValue, newGuard];
        })
    })

    const removeGuard = ((event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        setCompound((currentValue: Guard[]) => currentValue.slice(0, currentValue.length - 1))
    })

    const startMission = () => {
        setOutcome(calculateMissionOutcome(ninja, compound, setMessageQueue))
    }

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
                        <p className='font-display text-4xl text-theme-white'>Mission Name</p>
                    </div>
                    <div className='col-span-2 gap-2 px-4 rounded'>
                        <h2 className='text-primary font-display text-3xl pb-8 font-bold'>Objectives</h2>
                        <ul className='grid gap-2 px-2 text-theme-white font-display text-xl'>
                            <li><p className='px-2 py-1 flex items-center gap-2'><GiShurikenAperture />Get hidden missive</p></li>
                            <li><p className='px-2 py-1  flex items-center gap-2'><GiShurikenAperture />Poison general's flask</p></li>
                            <li><p className='px-2 py-1  flex items-center gap-2'><GiShurikenAperture />Remain unseen</p></li>
                        </ul>
                    </div>
                    <section className='col-span-2'>
                        <div className="w-full max-w-xl bg-theme-white rounded-full progress-bar-background">
                            <div className="font-display text-theme-white progress-bar w-1/4" />
                            <div className='w-full grid place-items-center relative z-20'>
                                <p className='text-theme-white font-display -mt-10'>25%</p>
                            </div>
                        </div>

                    </section>
                    <section>
                        <div className='font-display text-theme-white text-lg grid grid-cols-3 items-start ml-4'>
                            <p className='text-xl flex gap-2 items-center'><GiGrainBundle />800 Koku</p>
                            <p className='text-xl flex gap-2 items-center'><GiTreasureMap />Kyoto</p>
                            <p className=' text-xl flex gap-2 items-center'><FaSnowflake /> Cold</p>
                        </div>
                    </section>
                </section>
                <section id="score-board" className="w-full grid grid-cols-2 gap-8 p-4 mt-">
                    <div className='grid place-content-start gap-4 px-4 text-theme-white font-display text-2xl'>
                        <p className='title-border  text-4xl'>Shinobi Name</p>
                        <ul className='grid gap-2 pl-4'>
                            <li><p className=''>Assassinated 9</p></li>
                            <li><p className=''>Trapped 2</p></li>
                            <li><p className=''>Evaded 3</p></li>
                            <li><p className=''>Poisoned 1</p></li>
                        </ul>
                    </div>
                    <div className='grid place-content-start gap-4 px-4  text-theme-white font-display text-2xl '>
                        <p className='title-border text-4xl'>Compound Name</p>
                        <ul className='grid gap-2 pl-4'>
                            <li><p className=''>Guards 9</p></li>
                            <li><p className=''>Patrols 3</p></li>
                            <li><p className=''>Watch Towers 4</p></li>
                        </ul>
                    </div>
                </section>

            </main>
            <section className='grid grid-cols-2 gap-8 mx-8 lg:hidden'>
                <div>
                    <button onClick={startMission}>Complete mission</button>
                    <p>{progress}</p>
                </div>
                <div>
                    <p>Outcome: {outcome.missionResult}</p>
                    <p>Spotted: {outcome.spotted.toString()}</p>
                    <p>Fled: {outcome.spotted.toString()}</p>
                </div>
                <div >
                    <h2>Ninja</h2>
                    {map(ninja, (attributeValue, attributeName) => (
                        <dd key={attributeName} style={{ display: 'grid', gridTemplateColumns: '1fr auto ' }}>
                            <label htmlFor={'#' + attributeName}>{capitalize(attributeName)}</label>
                            <input value={attributeValue} name={attributeName} id={attributeName} type="number" min="1" max="20" onChange={updateNinja} />
                        </dd>
                    ))}

                </div>
                <div >
                    <h2>Compound</h2>
                    <div>
                        <button onClick={addGuard}>Add guard</button>
                        <button onClick={removeGuard}>Remove guard</button>
                        <label htmlFor="guard-power-level">Guard Power Level</label>
                        <input value={power} id={'guard-power-level'} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setPower(Number(event.currentTarget.value)) }} type='number' min={10} max={100} />
                    </div>
                    <Compound compound={compound} updateCompound={updateCompound} />
                </div>
            </section>
        </>
    )
}

export default MissionPage;
