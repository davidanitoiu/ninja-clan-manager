import { map } from "lodash";
import { Compound } from "utils/types/character/compound";
import Guard from "./Guard";

interface CompoundProps {
  compound: Compound,
  updateCompound: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function CompoundComponent({ compound, updateCompound }: CompoundProps): JSX.Element {
  return (
    <div>
      {map(compound, (guard, key) => (
        <Guard guard={guard} key={guard.name} guardNumber={key} updateCompound={updateCompound} />
      ))}
    </div>
  )
}

export default CompoundComponent;