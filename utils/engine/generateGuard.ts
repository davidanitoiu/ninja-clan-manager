import { random, uniqueId } from "lodash";
import { nameGen, Gender } from "utils/japanese-name-generator/generateName";
import { PowerLevel } from "utils/types/basic";
import { Guard, State } from "utils/types/character";

export function generateGuard(power: PowerLevel): Guard {
    const guard: Guard = {
        id: uniqueId(),
        personal: {
            name: nameGen(Gender.MALE).fullName,
            age: random(17, 46),
            state: State.ALIVE
        },
        attributes: {
            apprehension: random(1, 20 * (power / 100)),
            perception: random(1, 20 * (power / 100)),
            scouting: random(1, 20 * (power / 100)),
            handToHand: random(1, 20 * (power / 100)),
            ranged: random(1, 20 * (power / 100)),
            speed: random(1, 20 * (power / 100)),
            determination: random(1, 20 * (power / 100)),
            integrity: random(1, 20 * (power / 100)),
            stamina: random(1, 20 * (power / 100)),
        }
    };
    return guard;
}