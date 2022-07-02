import { capitalize, keys, map, slice, words } from 'lodash';
import { useRouter } from 'next/router';
import { Key, useState } from 'react';
import { Ninja } from 'utils/types/character';
import CustomSelect from './CustomSelect';
import NinjaRoster from './NinjaRoster';

interface NinjaRosterProps {
    list: Ninja[]
}

function NinjaRosterScreen({ list }: NinjaRosterProps) {
    const router = useRouter();

    const handleRowClick = (ninjaId: Key) => {
        router.push('/ninja?id=' + ninjaId);
    }

    const columns = [
        { 'key': 'id', 'name': 'ID', align: 'text-left', formatter: (props: Ninja) => props.id ?? 'No ID' },
        { 'key': 'name', 'name': 'Name', align: 'text-left', formatter: (props: Ninja) => props.personal.name ?? 'No Name' },
        { 'key': 'age', 'name': 'Age', formatter: (props: Ninja) => props.personal.age ?? 0 },
        { 'key': 'strength', 'name': 'Str', formatter: (props: Ninja) => props.attributes.physical.strength ?? 0 },
        { 'key': 'stamina', 'name': 'Sta', formatter: (props: Ninja) => props.attributes.physical.stamina ?? 0 },
        { 'key': 'reflexes', 'name': 'Ref', formatter: (props: Ninja) => props.attributes.physical.reflexes ?? 0 },
        { 'key': 'speed', 'name': 'Spd', formatter: (props: Ninja) => props.attributes.physical.speed ?? 0 },
        { 'key': 'agility', 'name': 'Acc', formatter: (props: Ninja) => props.attributes.physical.agility ?? 0 },
        { 'key': 'balance', 'name': 'Bal', formatter: (props: Ninja) => props.attributes.physical.balance ?? 0 },
        { 'key': 'precision', 'name': 'Pre', formatter: (props: Ninja) => props.attributes.physical.precision ?? 0 },
        { 'key': 'handToHand', 'name': 'Han', formatter: (props: Ninja) => props.attributes.combat.handToHand ?? 0 },
        { 'key': 'ranged', 'name': 'Ran', formatter: (props: Ninja) => props.attributes.combat.ranged ?? 0 },
        { 'key': 'stealth', 'name': 'Ste', formatter: (props: Ninja) => props.attributes.subterfuge.stealth ?? 0 },
        { 'key': 'assassination', 'name': 'Ass', formatter: (props: Ninja) => props.attributes.subterfuge.assassination ?? 0 },
        { 'key': 'pickpocketing', 'name': 'Pic', formatter: (props: Ninja) => props.attributes.subterfuge.pickpocketing ?? 0 },
        { 'key': 'lockpicking', 'name': 'Loc', formatter: (props: Ninja) => props.attributes.subterfuge.lockpicking ?? 0 },
        { 'key': 'poison', 'name': 'Poi', formatter: (props: Ninja) => props.attributes.subterfuge.poison ?? 0 },
        { 'key': 'trapMaking', 'name': 'Tra', formatter: (props: Ninja) => props.attributes.subterfuge.trapMaking ?? 0 },
        { 'key': 'aggression', 'name': 'Agg', formatter: (props: Ninja) => props.attributes.mental.aggression ?? 0 },
        { 'key': 'anticipation', 'name': 'Ant', formatter: (props: Ninja) => props.attributes.mental.anticipation ?? 0 },
        { 'key': 'decision', 'name': 'Dec', formatter: (props: Ninja) => props.attributes.mental.decision ?? 0 },
        { 'key': 'creativity', 'name': 'Cre', formatter: (props: Ninja) => props.attributes.mental.creativity ?? 0 },
        { 'key': 'positioning', 'name': 'Pos', formatter: (props: Ninja) => props.attributes.mental.positioning ?? 0 },
        { 'key': 'scouting', 'name': 'Sco', formatter: (props: Ninja) => props.attributes.mental.scouting ?? 0 },
        { 'key': 'negotiation', 'name': 'Neg', formatter: (props: Ninja) => props.attributes.mental.negotiation ?? 0 },
        { 'key': 'influence', 'name': 'Inf', formatter: (props: Ninja) => props.attributes.mental.influence ?? 0 },
    ]

    interface CategoryFilters {
        [key: string]: typeof columns
    }

    const categoryFilters: CategoryFilters = {
        all: slice(columns, 1),
        personal: slice(columns, 1, 3),
        onlyAttributes: [columns[1], ...slice(columns, 3)],
        physical: [columns[1], ...slice(columns, 3, 10)],
        combat: [columns[1], ...slice(columns, 10, 12)],
        subterfuge: [columns[1], ...slice(columns, 12, 18)],
        mental: [columns[1], ...slice(columns, 18)],
    }

    const [tableFilter, setTableFilter] = useState('all');
    const handleChange = (value: string) => {
        setTableFilter(value);
    }

    const filteredColumns = categoryFilters[tableFilter];
    const columnTypes = map(keys(categoryFilters), key => ({ key, value: capitalize(words(key).join(' ')) }));

    return (
        <main className='w-full font-display bg-gradient-to-br from-theme-black via-theme-black to-primary-dark p-4 gap-8 flex flex-col'>
            <div>
                <h2 className='text-theme-white text-4xl'>Clan: Iga</h2>
            </div>
            <div className='flex justify-between'>
                <CustomSelect value={tableFilter} options={columnTypes} onChange={handleChange} />
            </div>

            <NinjaRoster
                columns={filteredColumns}
                list={list}
                onRowClick={handleRowClick}
            />

        </main>
    )
}

export default NinjaRosterScreen;
