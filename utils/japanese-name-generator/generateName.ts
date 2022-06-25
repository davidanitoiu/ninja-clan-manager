import { random } from "lodash";
import names from "./names.json";

export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
    UNISEX = 'unisex'
}

export function nameGen(gender: Gender = Gender.UNISEX) {
    const firstName = names[gender][random(names[gender].length - 1)];
    const lastName = names.lastName[random(names.lastName.length - 1)];

    return {
        firstName,
        lastName,
        fullName: `${lastName} ${firstName}`
    }
}