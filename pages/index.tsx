import Compound from 'components/Compound';
import { capitalize, forEach, map } from 'lodash';
import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';
import { calculateMissionOutcome, generateGuard, generateNinja } from 'utils/engine';
import type { Guard, Ninja } from 'utils/types/character';
import { MissionOutcome, MissionResult } from 'utils/types/events';

const Home: NextPage = () => {
  const [ninja, setNinja] = useState<Ninja>(generateNinja(100));
  const [compound, setCompound] = useState<Guard[]>([]);
  const [outcome, setOutcome] = useState<MissionOutcome>({
    missionResult: MissionResult.UNRESOLVED,
    spotted: false,
    fled: false
  })
  const [power, setPower] = useState(100);
  const [progress, updateProgress] = useState('');

  const messageQueue: string[] = [];

  React.useEffect(() => {
    forEach(messageQueue, message => {
      setTimeout(() => {
        console.log(message);
      }, 2000)
    })
    console.dir(messageQueue)
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
    const guardNumber = attributeInput.getAttribute('data-guard-number');

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
    setOutcome(calculateMissionOutcome(ninja, compound, messageQueue))
  }

  return (
    <>
      <Head>
        <title>Ninja Clan Manager</title>
        <meta name="description" content="Manager type game, inspired by Football Manager, but with Ninjas" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ display: 'grid', gridTemplateColumns: '1fr 1fr ', gap: '2em', marginLeft: '2em', marginRight: '2em' }}>
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
            <input value={power} id={'guard-power-level'} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setPower(event.currentTarget.value) }} type='number' min={10} max={100} />
          </div>
          <Compound compound={compound} updateCompound={updateCompound} />
        </div>
      </main>
    </>
  )
}

export default Home
