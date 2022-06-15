import { map, omit, capitalize } from "lodash";
import { Guard } from "utils/types/character/compound";

interface GuardProps {
    guard: Guard,
    guardNumber: number,
    updateCompound: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function Guard({ guard, guardNumber, updateCompound }: GuardProps): JSX.Element {
    return (
        <dl key={guard.name}>
            <dt>Name: {guard.name} | Alive: <span style={{color: guard.alive ? 'green' : 'red'}}>{guard.alive.toString()}</span></dt>
            {map(guard.attributes, (attributeValue, attributeName) => (
                <dd key={guard.name + '-' + attributeName} style={{ display: 'grid', gridTemplateColumns: '1fr auto ' }}>
                    <label htmlFor={'#' + attributeName}>{capitalize(attributeName)}</label>
                    <input value={attributeValue} name={attributeName} id={attributeName} type="number" min="1" max="20" onChange={updateCompound} data-subcategory-of={'guard' + guardNumber + 1} />
                </dd>
            ))}
        </dl>
    )
}

export default Guard;
