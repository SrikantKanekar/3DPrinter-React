import Joi from "joi-browser";

export const schema = {
    quality: Joi.string(),
    layerHeight: Joi.number(),
    infillDensity: Joi.number(),
    infillPattern: Joi.string(),
    gradualInfill: Joi.boolean(),
    generateSupport: Joi.boolean(),
    supportStructure: Joi.string(),
    supportPlacement: Joi.string(),
    supportOverhangAngle: Joi.number(),
    supportPattern: Joi.string(),
    supportDensity: Joi.number(),
    wallLineWidth: Joi.number(),
    topBottomLineWidth: Joi.number(),
    wallThickness: Joi.number(),
    topThickness: Joi.number(),
    bottomThickness: Joi.number(),
    wallLineCount: Joi.number(),
    printSequence: Joi.string(),
};