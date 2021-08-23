import Joi from "joi-browser";

export const directRequestSchema = {
    super_time: Joi.string()
        .required()
        .label("Print Time"),
    super_material: Joi.number()
        .required()
        .label("Material Weight"),
    dynamic_time: Joi.string()
        .required()
        .label("Print Time"),
    dynamic_material: Joi.number()
        .required()
        .label("Material Weight"),
    standard_time: Joi.string()
        .required()
        .label("Print Time"),
    standard_material: Joi.number()
        .required()
        .label("Material Weight"),
    low_time: Joi.string()
        .required()
        .label("Print Time"),
    low_material: Joi.number()
        .required()
        .label("Material Weight")
}