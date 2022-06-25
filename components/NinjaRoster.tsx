import { map } from "lodash";
import { Key } from "react";
import type { Ninja } from "utils/types/character";

interface NinjaRosterProps {
    columns: {
        key: string,
        name: string,
        align?: string,
        formatter: (props: Ninja) => number | string
    }[],
    list: Ninja[],
    onRowClick: (ninjaId: Key) => void
}

function NinjaRoster({ columns, list, onRowClick }: NinjaRosterProps) {
    return (
        <section>
            <table className="w-full px-4">
                <thead>
                    <tr className="px-4 text-primary-dark h-12 text-lg">
                        {map((columns), column => (
                            <th className={`first:pl-2 ${column.align ?? 'text-center'}`} key={column.key}>{column.name}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {map(list, ninja => (
                        <tr key={ninja.id}
                            className="hover:bg-primary-dark hover:cursor-pointer px-4 h-8 rounded-lg"
                            onClick={() => onRowClick(ninja.id)}>
                            {map(columns, column => (
                                <td key={column.key}
                                    itemProp={column.key}
                                    className={`first:pl-2 text-theme-white ${column.align ?? 'text-center'}`}
                                >{column.formatter(ninja)}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

        </section>
    )
}

export default NinjaRoster;
