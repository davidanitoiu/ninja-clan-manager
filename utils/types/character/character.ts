export type Attribute = number;
export type PowerLevel = number;


export enum State {
    ALIVE = 'alive',
    DEAD = 'dead',
    WOUNDED = 'wounded',
    UNCONSCIOUS = 'unconscious',
    CAPTURED = 'captured',
    ALERTED = 'alerted',
}

export type Character = {
    id: string,
    personal: {
        name: string,
        age: number,
        state: State,
    },
}

export type Target = Character | Guard;

export type Guard = Character & {
    attributes: {
        apprehension: Attribute,
        perception: Attribute,
        scouting: Attribute,
        handToHand: Attribute,
        ranged: Attribute,
        speed: Attribute,
        determination: Attribute,
        integrity: Attribute,
        stamina: Attribute,
    }
}

export type Compound = Guard[]

export type Ninja = Character & {
    attributes: {
        physical: {
            strength: Attribute,
            stamina: Attribute,
            reflexes: Attribute,
            speed: Attribute,
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
