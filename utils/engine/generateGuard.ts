import { random } from "lodash";
import { PowerLevel } from "utils/types/basic";
import { Guard } from "utils/types/character/compound";

export function generateGuard(power: PowerLevel): Guard {
    const guard: Guard = {
        name: 'Guard' + random(100),
        alive: true,
        attributes: {
            apprehension: random(1, 20*(power / 100)),
            scouting: random(1, 20*(power / 100)),
            handToHand: random(1, 20*(power / 100)),
            ranged: random(1, 20*(power / 100)),
            pace: random(1, 20*(power / 100)),
            acceleration: random(1, 20*(power / 100)),
            determination: random(1, 20*(power / 100)),
        }
    }
    return guard;
}