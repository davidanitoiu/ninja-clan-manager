import { Attribute } from "../basic"

export type Ninja = {
  id: string,
  personal: {
    name: string,
    age: number
  },
  attributes: {
    physical: {
      strength: Attribute,
      stamina: Attribute,
      reflexes: Attribute,
      pace: Attribute,
      acceleration: Attribute,
      agility: Attribute,
      balance: Attribute,
      precision: Attribute,
    },
    combat: {
      handToHand: Attribute,
      ranged: Attribute,
    },
    subterfuge: {
      stealth: Attribute,
      assassination: Attribute,
      pickpocketing: Attribute,
      lockpicking: Attribute,
      poison: Attribute,
      medicine: Attribute,
      trapMaking: Attribute,
    },
    mental: {
      aggression: Attribute,
      anticipation: Attribute,
      decision: Attribute,
      creativity: Attribute,
      positioning: Attribute,
      scouting: Attribute,
      negotiation: Attribute,
      influence: Attribute,
    }
  }
}
