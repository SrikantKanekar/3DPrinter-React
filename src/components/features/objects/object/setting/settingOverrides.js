import recommended from "./recommended/recommended";
import basic from "./basic";
import advanced from "./advanced";
import {defaultSetting} from "./defaultSetting";

export function getCuraOverrides(setting) {
    const curaOverrides = []
    const level = setting.level

    curaOverrides.push(...defaultSetting)

    if (level >= 0) {
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

    console.log(curaOverrides)
    return curaOverrides
}