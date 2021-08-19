import {set} from "../curaSet";
import {superQuality} from "./super";
import {dynamicQuality} from "./dynamic";
import {standardQuality} from "./standard";
import {lowQuality} from "./low";

export default function recommended(setting) {

    const array = []

    if (setting.quality === "SUPER") {
        array.push(...superQuality)
    } else if (setting.quality === "DYNAMIC") {
        array.push(...dynamicQuality)
    } else if (setting.quality === "STANDARD") {
        array.push(...standardQuality)
    } else if (setting.quality === "LOW") {
        array.push(...lowQuality)
    }

    array.push(
        set('infill_sparse_density', setting.gradualInfill ? 90 : setting.infill),
        set('gradual_infill_steps', setting.gradualInfill ? 5 : 0),
        set('support_enable', setting.support)
    )

    return array
}