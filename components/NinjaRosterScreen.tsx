import { capitalize, map, slice } from 'lodash';
import { useRouter } from 'next/router';
import { ChangeEvent, useMemo, useState } from 'react';
import type { Column } from 'react-data-grid';
import DataGrid from 'react-data-grid';
import { Ninja } from 'utils/types/character';

interface NinjaRosterProps {
    list: Ninja[]
}

function NinjaRosterScreen({ list }: NinjaRosterProps) {
    const router = useRouter();

    const handleRowClick = (row: Ninja) => {
        if (row) {
            router.push('/ninja?id=' + row.id);
        }
    }

    const columns: Column<Ninja>[] = [
        { 'key': 'id', 'name': 'ID' },
        { 'key': 'name', 'name': 'Name', formatter: (props) => props.row.personal.name ?? 'No Name' },
        { 'key': 'age', 'name': 'Age', formatter: (props) => props.row.personal.age ?? 0 },
        { 'key': 'strength', 'name': 'Str', formatter: (props) => props.row.attributes.physical.strength ?? 0 },
        { 'key': 'stamina', 'name': 'Sta', formatter: (props) => props.row.attributes.physical.stamina ?? 0 },
        { 'key': 'reflexes', 'name': 'Ref', formatter: (props) => props.row.attributes.physical.reflexes ?? 0 },
        { 'key': 'pace', 'name': 'Pac', formatter: (props) => props.row.attributes.physical.pace ?? 0 },
        { 'key': 'acceleration', 'name': 'Acc', formatter: (props) => props.row.attributes.physical.acceleration ?? 0 },
        { 'key': 'agility', 'name': 'Acc', formatter: (props) => props.row.attributes.physical.agility ?? 0 },
        { 'key': 'balance', 'name': 'Bal', formatter: (props) => props.row.attributes.physical.balance ?? 0 },
        { 'key': 'precision', 'name': 'Pre', formatter: (props) => props.row.attributes.physical.precision ?? 0 },
        { 'key': 'handToHand', 'name': 'Han', formatter: (props) => props.row.attributes.combat.handToHand ?? 0 },
        { 'key': 'ranged', 'name': 'Ran', formatter: (props) => props.row.attributes.combat.ranged ?? 0 },
        { 'key': 'stealth', 'name': 'Ste', formatter: (props) => props.row.attributes.subterfuge.stealth ?? 0 },
        { 'key': 'assassination', 'name': 'Ass', formatter: (props) => props.row.attributes.subterfuge.assassination ?? 0 },
        { 'key': 'pickpocketing', 'name': 'Pic', formatter: (props) => props.row.attributes.subterfuge.pickpocketing ?? 0 },
        { 'key': 'lockpicking', 'name': 'Loc', formatter: (props) => props.row.attributes.subterfuge.lockpicking ?? 0 },
        { 'key': 'poison', 'name': 'Poi', formatter: (props) => props.row.attributes.subterfuge.poison ?? 0 },
        { 'key': 'medicine', 'name': 'Med', formatter: (props) => props.row.attributes.subterfuge.medicine ?? 0 },
        { 'key': 'trapMaking', 'name': 'Tra', formatter: (props) => props.row.attributes.subterfuge.trapMaking ?? 0 },
        { 'key': 'aggression', 'name': 'Agg', formatter: (props) => props.row.attributes.mental.aggression ?? 0 },
        { 'key': 'anticipation', 'name': 'Ant', formatter: (props) => props.row.attributes.mental.anticipation ?? 0 },
        { 'key': 'decision', 'name': 'Dec', formatter: (props) => props.row.attributes.mental.decision ?? 0 },
        { 'key': 'creativity', 'name': 'Cre', formatter: (props) => props.row.attributes.mental.creativity ?? 0 },
        { 'key': 'positioning', 'name': 'Pos', formatter: (props) => props.row.attributes.mental.positioning ?? 0 },
        { 'key': 'scouting', 'name': 'Sco', formatter: (props) => props.row.attributes.mental.scouting ?? 0 },
        { 'key': 'negotiation', 'name': 'Neg', formatter: (props) => props.row.attributes.mental.negotiation ?? 0 },
        { 'key': 'influence', 'name': 'Inf', formatter: (props) => props.row.attributes.mental.influence ?? 0 },
    ]

    const rowKeyGetter = (row: Ninja) => row.id;

    interface ColumnTypes {
        [key: string]: Column<Ninja>[]
    }

    const columnTypes: ColumnTypes = {
        all: columns,
        personal: slice(columns, 1, 3),
        'only Attributes': [columns[1], ...slice(columns, 3)],
        physical: [columns[1], ...slice(columns, 3, 11)],
        combat: [columns[1], ...slice(columns, 11, 13)],
        subterfuge: [columns[1], ...slice(columns, 13, 20)],
        mental: [columns[1], ...slice(columns, 20)],
    }

    const [tableFilter, setTableFilter] = useState('all');
    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setTableFilter(event.target.value);
    }

    const filteredColumns = useMemo(() => columnTypes[tableFilter], [tableFilter])

    return (
        <main className='w-full font-display'>
            <select value={tableFilter} onChange={handleChange}>
                {map(columnTypes, (_, key) => (
                    <option value={key} key={key}>{capitalize(key)}</option>
                ))}
            </select>
            {/* react-data-grid doesn't like my column type definition. 
                one day I may find out why, but that day, is not today
             */}
            {/* @ts-ignore */}
            <DataGrid columns={filteredColumns}
                rows={list}
                rowKeyGetter={rowKeyGetter}
                onRowClick={handleRowClick}
            />


        </main>
    )
}

export default NinjaRosterScreen;
