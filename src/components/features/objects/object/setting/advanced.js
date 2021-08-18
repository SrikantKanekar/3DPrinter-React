import {set} from "./curaSet";

export default function advanced(setting) {
    return [
        // speed
        set('speed_infill', setting.infillSpeed),
        set('speed_wall_0', setting.outerWallSpeed),
        set('speed_wall_x', setting.innerWallSpeed),
        set('speed_topbottom', setting.topBottomSpeed),
        set('speed_support', setting.supportSpeed),

        // support
        set('support_pattern', setting.supportPattern),
        set('support_infill_rate', setting.supportDensity),
        set('support_structure', setting.supportStructure),

        // special modes
        set('print_sequence', setting.printSequence),
    ]
}