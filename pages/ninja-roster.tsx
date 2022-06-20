import { generateNinja } from 'utils/engine';
import { Ninja } from 'utils/types/character';
import type { Column } from 'react-data-grid';
import DataGrid from 'react-data-grid';
import { slice } from 'lodash';
import { ChangeEvent, useState } from 'react';

function NinjaRoster({ ninjaRoster = [] }: { ninjaRoster: Ninja[] }) {

    const columns: Column<Ninja>[] = [
        { 'key': 'id', 'name': 'ID' },
        { 'key': 'name', 'name': 'Name', formatter: ({ row }) => row.personal?.name ?? 'No Name' },
        { 'key': 'age', 'name': 'Age', formatter: ({ row }) => row.personal?.age ?? 0 },
        { 'key': 'strength', 'name': 'Str', formatter: ({ row }) => row.attributes?.strength ?? 0 },
        { 'key': 'stamina', 'name': 'Sta', formatter: ({ row }) => row.attributes?.stamina ?? 0 },
        { 'key': 'reflexes', 'name': 'Ref', formatter: ({ row }) => row.attributes?.reflexes ?? 0 },
        { 'key': 'pace', 'name': 'Pac', formatter: ({ row }) => row.attributes?.pace ?? 0 },
        { 'key': 'acceleration', 'name': 'Acc', formatter: ({ row }) => row.attributes?.acceleration ?? 0 },
        { 'key': 'agility', 'name': 'Acc', formatter: ({ row }) => row.attributes?.agility ?? 0 },
        { 'key': 'balance', 'name': 'Bal', formatter: ({ row }) => row.attributes?.balance ?? 0 },
        { 'key': 'precision', 'name': 'Pre', formatter: ({ row }) => row.attributes?.precision ?? 0 },
        { 'key': 'handToHand', 'name': 'Han', formatter: ({ row }) => row.attributes?.handToHand ?? 0 },
        { 'key': 'ranged', 'name': 'Ran', formatter: ({ row }) => row.attributes?.ranged ?? 0 },
        { 'key': 'stealth', 'name': 'Ste', formatter: ({ row }) => row.attributes?.stealth ?? 0 },
        { 'key': 'assassination', 'name': 'Ass', formatter: ({ row }) => row.attributes?.assassination ?? 0 },
        { 'key': 'pickpocketing', 'name': 'Pic', formatter: ({ row }) => row.attributes?.pickpocketing ?? 0 },
        { 'key': 'lockpicking', 'name': 'Loc', formatter: ({ row }) => row.attributes?.lockpicking ?? 0 },
        { 'key': 'poison', 'name': 'Poi', formatter: ({ row }) => row.attributes?.poison ?? 0 },
        { 'key': 'medicine', 'name': 'Med', formatter: ({ row }) => row.attributes?.medicine ?? 0 },
        { 'key': 'trapMaking', 'name': 'Tra', formatter: ({ row }) => row.attributes?.trapMaking ?? 0 },
        { 'key': 'aggression', 'name': 'Agg', formatter: ({ row }) => row.attributes?.aggression ?? 0 },
        { 'key': 'anticipation', 'name': 'Ant', formatter: ({ row }) => row.attributes?.anticipation ?? 0 },
        { 'key': 'decision', 'name': 'Dec', formatter: ({ row }) => row.attributes?.decision ?? 0 },
        { 'key': 'creativity', 'name': 'Cre', formatter: ({ row }) => row.attributes?.creativity ?? 0 },
        { 'key': 'positioning', 'name': 'Pos', formatter: ({ row }) => row.attributes?.positioning ?? 0 },
        { 'key': 'scouting', 'name': 'Sco', formatter: ({ row }) => row.attributes?.scouting ?? 0 },
        { 'key': 'negotiation', 'name': 'Neg', formatter: ({ row }) => row.attributes?.negotiation ?? 0 },
        { 'key': 'influence', 'name': 'Inf', formatter: ({ row }) => row.attributes?.influence ?? 0 },
    ]

    const rowKeyGetter = (row: Ninja) => row.id;

    const columnTypes = {
        all: columns,
        personal: slice(columns, 1, 3),
        allAttributes: [columns[1], ...slice(columns, 3)],
        physical: [columns[1], ...slice(columns, 3, 11)],
        combat: [columns[1], ...slice(columns, 11, 13)],
        subterfuge: [columns[1], ...slice(columns, 13, 20)],
        mental: [columns[1], ...slice(columns, 20)],
    }

    const [tableFilter, setTableFilter] = useState('all');
    const onSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        setTableFilter(event.target.value);
    }

    return (
        <main className='w-full font-display'>
            <select defaultValue={'all'} value={tableFilter} onChange={onSelect}>
                <option value={'all'}>All</option>
                <option value={'personal'}>Personal</option>
                <option value={'allAttributes'}>Only Attributes</option>
                <option value={'physical'}>Physical</option>
                <option value={'subterfuge'}>Subterfuge</option>
                <option value={'mental'}>Mental</option>
                <option value={'combat'}>Combat</option>
            </select>
            <DataGrid columns={columnTypes[tableFilter]} rows={ninjaRoster} rowKeyGetter={rowKeyGetter} />


        </main>
    )
}

export async function getServerSideProps() {
    const ninjaRoster = [generateNinja(50), generateNinja(70), generateNinja(60), generateNinja(40), generateNinja(20), generateNinja(100), generateNinja(100)];

    return {
        props: { ninjaRoster }
    }
}

export default NinjaRoster;


