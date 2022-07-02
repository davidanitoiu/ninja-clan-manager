import { map, omit, capitalize } from "lodash";
import { Guard as GuardCharacter, State } from "utils/types/character";

interface GuardProps {
    guard: GuardCharacter,
    guardNumber: number,
    updateCompound: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function Guard({ guard, guardNumber, updateCompound }: GuardProps): JSX.Element {
    return (
        <dl key={guard.id}>
            <dt>Name: {guard.personal.name} | Alive: <span style={{color: guard.personal.state === State.ALIVE ? 'green' : 'red'}}>{guard.personal.state}</span></dt>
            {map(guard.attributes, (attributeValue, attributeName) => (
                <dd key={guard.id + '-' + attributeName} style={{ display: 'grid', gridTemplateColumns: '1fr auto ' }}>
                    <label htmlFor={'#' + attributeName}>{capitalize(attributeName)}</label>
                    <input value={attributeValue} name={attributeName} id={attributeName} type="number" min="1" max="20" onChange={updateCompound} data-subcategory-of={'guard' + guardNumber + 1} />
                </dd>
            ))}
        </dl>
    )
}

export default Guard;
