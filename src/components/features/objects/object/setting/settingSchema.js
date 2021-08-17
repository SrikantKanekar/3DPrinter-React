import Joi from "joi-browser";

export const schema = {
    updated: Joi.boolean(),
    level: Joi.number(),

    quality: Joi.string(),
    infill: Joi.number(),
    gradualInfill: Joi.boolean(),
    support: Joi.boolean(),

    layerHeight: Joi.number(),
    infillDensity: Joi.number(),
    infillPattern: Joi.string(),
    generateSupport: Joi.boolean(),
    supportStructure: Joi.string(),
    supportPlacement: Joi.string(),
    supportOverhangAngle: Joi.number(),
    supportPattern: Joi.string(),
    supportDensity: Joi.number(),
    wallLineWidth: Joi.number(),
    topBottomLineWidth: Joi.number(),
    wallThickness: Joi.number(),
    wallLineCount: Joi.number(),
    topThickness: Joi.number(),
    bottomThickness: Joi.number(),
    infillSpeed: Joi.number(),
    outerWallSpeed: Joi.number(),
    innerWallSpeed: Joi.number(),
    topBottomSpeed: Joi.number(),
    supportSpeed: Joi.number(),
    printSequence: Joi.string(),
};