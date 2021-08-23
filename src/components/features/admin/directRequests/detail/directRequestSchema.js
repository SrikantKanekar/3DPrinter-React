import Joi from "joi-browser";

export const directRequestSchema = {
    super_printTime: Joi.string()
        .required()
        .label("Print Time"),
    super_materialWeight: Joi.number()
        .required()
        .label("Material Weight"),
    super_filament: Joi.number()
        .required()
        .label("Filament"),
    super_materialCost: Joi.number()
        .required()
        .label("Material Cost"),
    super_powerCost: Joi.number()
        .required()
        .label("Power Cost"),
    super_labourCost: Joi.number()
        .required()
        .label("Labour Cost"),
    super_price: Joi.number()
        .required()
        .label("Price"),
    dynamic_printTime: Joi.string()
        .required()
        .label("Print Time"),
    dynamic_materialWeight: Joi.number()
        .required()
        .label("Material Weight"),
    dynamic_filament: Joi.number()
        .required()
        .label("Filament"),
    dynamic_materialCost: Joi.number()
        .required()
        .label("Material Cost"),
    dynamic_powerCost: Joi.number()
        .required()
        .label("Power Cost"),
    dynamic_labourCost: Joi.number()
        .required()
        .label("Labour Cost"),
    dynamic_price: Joi.number()
        .required()
        .label("Price"),
    standard_printTime: Joi.string()
        .required()
        .label("Print Time"),
    standard_materialWeight: Joi.number()
        .required()
        .label("Material Weight"),
    standard_filament: Joi.number()
        .required()
        .label("Filament"),
    standard_materialCost: Joi.number()
        .required()
        .label("Material Cost"),
    standard_powerCost: Joi.number()
        .required()
        .label("Power Cost"),
    standard_labourCost: Joi.number()
        .required()
        .label("Labour Cost"),
    standard_price: Joi.number()
        .required()
        .label("Price"),
    low_printTime: Joi.string()
        .required()
        .label("Print Time"),
    low_materialWeight: Joi.number()
        .required()
        .label("Material Weight"),
    low_filament: Joi.number()
        .required()
        .label("Filament"),
    low_materialCost: Joi.number()
        .required()
        .label("Material Cost"),
    low_powerCost: Joi.number()
        .required()
        .label("Power Cost"),
    low_labourCost: Joi.number()
        .required()
        .label("Labour Cost"),
    low_price: Joi.number()
        .required()
        .label("Price"),
    custom_printTime: Joi.string()
        .allow('')
        .label("Print Time"),
    custom_materialWeight: Joi.number()
        .allow('')
        .label("Material Weight"),
    custom_filament: Joi.number()
        .allow('')
        .label("Filament"),
    custom_materialCost: Joi.number()
        .allow('')
        .label("Material Cost"),
    custom_powerCost: Joi.number()
        .allow('')
        .label("Power Cost"),
    custom_labourCost: Joi.number()
        .allow('')
        .label("Labour Cost"),
    custom_price: Joi.number()
        .allow('')
        .label("Price"),
}