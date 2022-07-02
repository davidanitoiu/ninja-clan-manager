import { PowerLevel } from "utils/types/basic";
import { Ninja, State } from "utils/types/character";
import { random, uniqueId } from "lodash";
import { Gender, nameGen } from "../japanese-name-generator/generateName";


export function generateNinja(power: PowerLevel): Ninja {
  const ninja: Ninja = {
    id: uniqueId(),
    personal: {
      name: nameGen(Gender.MALE).fullName,
      age: random(17, 46),
      state: State.ALIVE
    },
    attributes: {
      physical: {
        strength: random(1, 20 * (power / 100)),
        stamina: random(1, 20 * (power / 100)),
        reflexes: random(1, 20 * (power / 100)),
        speed: random(1, 20 * (power / 100)),
        agility: random(1, 20 * (power / 100)),
        balance: random(1, 20 * (power / 100)),
        precision: random(1, 20 * (power / 100)),
      },
      combat: {
        handToHand: random(1, 20 * (power / 100)),
        ranged: random(1, 20 * (power / 100)),
      },
      subterfuge: {
        stealth: random(1, 20 * (power / 100)),
        assassination: random(1, 20 * (power / 100)),
        pickpocketing: random(1, 20 * (power / 100)),
        lockpicking: random(1, 20 * (power / 100)),
        poison: random(1, 20 * (power / 100)),
        trapMaking: random(1, 20 * (power / 100)),
      },
      mental: {
        aggression: random(1, 20 * (power / 100)),
        anticipation: random(1, 20 * (power / 100)),
        decision: random(1, 20 * (power / 100)),
        creativity: random(1, 20 * (power / 100)),
        positioning: random(1, 20 * (power / 100)),
        scouting: random(1, 20 * (power / 100)),
        negotiation: random(1, 20 * (power / 100)),
        influence: random(1, 20 * (power / 100)),
      }
    }
  }
  return ninja;
}