import { Attribute } from "../basic";

export type Guard = {
    name: string,
    alive: boolean,
    attributes: {
        apprehension: Attribute,
        scouting: Attribute,
        handToHand: Attribute,
        ranged: Attribute,
        pace: Attribute,
        acceleration: Attribute,
        determination: Attribute,
    }
}

export type Compound = Guard[];
