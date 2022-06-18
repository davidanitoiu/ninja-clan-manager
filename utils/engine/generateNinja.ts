import { PowerLevel } from "utils/types/basic";
import { Ninja } from "utils/types/character";
import {random} from "lodash";

export function generateNinja(power:PowerLevel):Ninja {
    const ninja:Ninja =  {
        name: 'Kojiro Kage',
        strength: random(1,20*(power / 100)),
        stamina: random(1,20*(power / 100)),
        reflexes: random(1,20*(power / 100)),
        pace: random(1,20*(power / 100)),
        acceleration: random(1,20*(power / 100)),
        agility: random(1,20*(power / 100)),
        balance: random(1,20*(power / 100)),
        precision: random(1,20*(power / 100)),
        handToHand: random(1,20*(power / 100)),
        ranged: random(1,20*(power / 100)),
        stealth: random(1,20*(power / 100)),
        assassination: random(1,20*(power / 100)),
        pickpocketing: random(1,20*(power / 100)),
        lockpicking: random(1,20*(power / 100)),
        poison: random(1,20*(power / 100)),
        medicine: random(1,20*(power / 100)),
        trapMaking: random(1,20*(power / 100)),
        aggression: random(1,20*(power / 100)),
        anticipation: random(1,20*(power / 100)),
        decision: random(1,20*(power / 100)),
        creativity: random(1,20*(power / 100)),
        positioning: random(1,20*(power / 100)),
        scouting: random(1,20*(power / 100)),
        negotiation: random(1,20*(power / 100)),
        influence: random(1,20*(power / 100)),
      }
    return ninja;
}