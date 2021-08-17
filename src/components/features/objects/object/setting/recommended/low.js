import {set} from "../curaSet";

export const lowQuality = [
    // Quality
    set('layer_height', 0.28),
    set('layer_height_0', 0.28),

    // Shell
    set('wall_thickness', 0.8),
    set('wall_line_count', 2),
    set('top_bottom_thickness', 1.12),
    set('top_thickness', 1.12),
    set('top_layers', 4),
    set('bottom_thickness', 1.12),
    set('bottom_layers', 4),

    // Infill
    set('infill_sparse_thickness', 0.28),
    set('skin_preshrink', 0.8),
    set('top_skin_preshrink', 0.8),
    set('bottom_skin_preshrink', 0.8),
    set('expand_skins_expand_distance', 0.8),
    set('top_skin_expand_distance', 0.8),
    set('bottom_skin_expand_distance', 0.8),
    set('min_skin_width_for_expansion', 6.86E-17),

    // cooling
    set('cool_fan_full_at_height', 0.84),

    // support
    set('support_angle', 35),
    set('support_z_distance', 0.28),
    set('support_top_distance', 0.28),
    set('support_bottom_distance', 0.28),
    set('support_infill_sparse_thickness', 0.28),
    set('support_interface_height', 1.12),
    set('support_roof_height', 1.12),
    set('support_bottom_height', 1.12),

    // Build Plate Adhesion
    set('raft_surface_thickness', 0.28),
    set('raft_interface_thickness', 0.42),
    set('raft_base_thickness', 0.336),

    // Experimental
    set('adaptive_layer_height_enabled', false)
]