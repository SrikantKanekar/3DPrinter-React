import {set} from "./curaSet";

export default function basic(setting) {
    return [
        //quality
        set('layer_height', setting.layerHeight),

        // shell
        set('wall_thickness', setting.wallThickness),
        set('wall_line_count', setting.wallLineCount),
        set('top_thickness', setting.topThickness),
        set('bottom_thickness', setting.bottomThickness),

        // infill
        set('infill_sparse_density', setting.infillDensity),
        set('infill_pattern', setting.infillPattern),

        // support
        set('support_enable', setting.generateSupport),
        set('support_type', setting.supportPlacement),
        set('support_angle', setting.supportOverhangAngle),
    ]
}