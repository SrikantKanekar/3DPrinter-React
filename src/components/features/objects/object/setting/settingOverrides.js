import recommended from "./recommended/recommended";
import basic from "./basic";
import advanced from "./advanced";
import {set} from "./curaSet";

export function getCuraOverrides(setting) {
    const curaOverrides = []
    const level = setting.level

    if (level === 0) {
        curaOverrides.push(...recommended(setting))
    }
    if (level >= 1) {
        curaOverrides.push(...basic(setting))
    }
    if (level >= 2) {
        curaOverrides.push(...advanced(setting))
    }
    if (level === 3) {
        curaOverrides.push()
    }

    curaOverrides.push(set("machine_depth", 220))

    console.log(curaOverrides)
    return curaOverrides
}