import {defaultSetting} from "./settings/defaultSetting";
import {superQuality} from "./settings/super";
import {dynamicQuality} from "./settings/dynamic";
import {standardQuality} from "./settings/standard";
import {lowQuality} from "./settings/low";
import {set} from "./settings/curaSet";

export function getCuraOverrides(quality) {
    const setting = []

    setting.push(...defaultSetting)

    if (quality === "SUPER") {
        setting.push(...superQuality)
    } else if (quality === "DYNAMIC") {
        setting.push(...dynamicQuality)
    } else if (quality === "STANDARD") {
        setting.push(...standardQuality)
    } else if (quality === "LOW") {
        setting.push(...lowQuality)
    }

    //support settings
    setting.push(
        set('support_enable', true)
    )

    console.log(setting)
    return setting
}