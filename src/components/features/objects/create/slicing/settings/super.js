import {set} from "./curaSet";

export const superQuality = [
    // Quality
    set('layer_height', 0.12),
    set('layer_height_0', 0.12),

    // Shell
    set('wall_thickness', 1.2),
    set('wall_line_count', 3),
    set('top_bottom_thickness', 0.84),
    set('top_thickness', 0.84),
    set('top_layers', 7),
    set('bottom_thickness', 0.84),
    set('bottom_layers', 7),

    // Infill
    set('infill_sparse_thickness', 0.12),
    set('skin_preshrink', 1.2),
    set('top_skin_preshrink', 1.2),
    set('bottom_skin_preshrink', 1.2),
    set('expand_skins_expand_distance', 1.2),
    set('top_skin_expand_distance', 1.2),
    set('bottom_skin_expand_distance', 1.2),
    set('min_skin_width_for_expansion', 5.14E-17),

    // cooling
    set('cool_fan_full_at_height', 0.36),

    // support
    set('support_angle', 59),
    set('support_z_distance', 0.24),
    set('support_top_distance', 0.24),
    set('support_bottom_distance', 0.24),
    set('support_infill_sparse_thickness', 0.12),
    set('support_interface_height', 0.96),
    set('support_roof_height', 0.96),
    set('support_bottom_height', 0.96),

    // Build Plate Adhesion
    set('raft_surface_thickness', 0.12),
    set('raft_interface_thickness', 0.18),
    set('raft_base_thickness', 0.144),

    // Experimental
    set('adaptive_layer_height_enabled', false)
]