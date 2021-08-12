import React from 'react';
import Joi from "joi-browser";
import Form from "../../../form/form";
import FormContainer from "../../../form/formContainer/formContainer";
import objectService from "../../../../services/objectService";

class SettingForm extends Form {

    constructor(props) {
        super(props)
        this.state = {
            data: props.object.setting,
            errors: {},
            formError: '',
            formSuccess: ''
        }
    }

    schema = {
        updated: Joi.boolean(),
        advanced: Joi.boolean(),

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

    doSubmit = async () => {
        try {
            const {data} = this.state;
            data.updated = true
            const {data: setting} = await objectService.updateSetting(this.props.object.id, data)
            const object = {...this.props.object}
            object.setting = setting
            this.props.updateObject(object)
            this.setState({formSuccess: "Successfully Updated"})
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                this.setState({formError: ex.response.data});
            }
        }
    };

    render() {
        return (
            <FormContainer
                title="Settings"
                buttonLabel="Update"
                errors={this.validate()}
                formError={this.state.formError}
                formSuccess={this.state.formSuccess}
                onSubmit={this.handleSubmit}>
                {this.renderCheckbox("advanced", "Advanced User")}

                {this.renderSelect("quality", "Quality", this.quality)}
                {this.renderInput("infill", "Infill (%)")}
                {this.renderCheckbox("gradualInfill", "Gradual Infill")}
                {this.renderCheckbox("support", "Support")}

                {this.renderInput("layerHeight", "Layer Height (mm)")}
                {this.renderInput("infillDensity", "Infill Density (%)")}
                {this.renderSelect("infillPattern", "Infill Pattern", this.infillPattern)}
                {this.renderCheckbox("generateSupport", "Generate Support")}
                {this.renderSelect("supportStructure", "Support Structure", this.supportStructure)}
                {this.renderSelect("supportPlacement", "Support Placement", this.supportPlacement)}
                {this.renderInput("supportOverhangAngle", "Support Overhang Angle")}
                {this.renderSelect("supportPattern", "Support Pattern", this.supportPattern)}

                {this.renderInput("supportDensity", "Support Density (%)")}
                {this.renderInput("wallLineWidth", "Wall Line Width (mm)")}
                {this.renderInput("topBottomLineWidth", "Top/Bottom Line Width (mm)")}
                {this.renderInput("wallThickness", "Wall Thickness (mm)")}
                {this.renderInput("wallLineCount", "Wall Line Count")}
                {this.renderInput("topThickness", "Top Thickness (mm)")}
                {this.renderInput("bottomThickness", "Bottom Thickness (mm)")}
                {this.renderInput("infillSpeed", "Infill Speed (mm/s)")}
                {this.renderInput("outerWallSpeed", "Outer Wall Speed (mm/s)")}
                {this.renderInput("innerWallSpeed", "Inner Wall Speed (mm/s)")}
                {this.renderInput("topBottomSpeed", "Top Bottom Speed (mm/s)")}
                {this.renderInput("supportSpeed", "Support Speed (mm/s)")}
                {this.renderSelect("printSequence", "Print Sequence", this.printSequence)}
            </FormContainer>
        );
    }

    quality = [
        {id: "SUPER", name: "Super"},
        {id: "DYNAMIC", name: "Dynamic"},
        {id: "STANDARD", name: "Standard"},
        {id: "LOW", name: "Low"}
    ]

    infillPattern = [
        {id: "LINES", name: "Lines"},
        {id: "GRID", name: "Grid"},
        {id: "TRIANGLES", name: "Triangles"},
        {id: "TRI_HEXAGON", name: "Tri Hexagon"},
        {id: "CUBIC", name: "Cubic"},
        {id: "CUBIC_SUBDIVISION", name: "Cubic Subdivision"},
        {id: "OCTET", name: "Octet"},
        {id: "QUARTER_CUBIC", name: "Quarter Cubic"},
        {id: "CONCENTRIC", name: "Concentric"},
        {id: "ZIG_ZAG", name: "Zig Zag"},
        {id: "CROSS", name: "Cross"},
        {id: "CROSS_3D", name: "Cross 3D"},
        {id: "GYROID", name: "Gyroid"}
    ]

    supportStructure = [
        {id: "NORMAL", name: "Normal"},
        {id: "TREE", name: "Tree"},
    ]

    supportPlacement = [
        {id: "TOUCHING_BUILD_PLATE", name: "Touching Build Plate"},
        {id: "EVERYWHERE", name: "Everywhere"}
    ]

    supportPattern = [
        {id: "LINES", name: "Lines"},
        {id: "GRID", name: "Grid"},
        {id: "TRIANGLES", name: "Triangles"},
        {id: "CONCENTRIC", name: "Concentric"},
        {id: "ZIG_ZAG", name: "Zig Zag"},
        {id: "CROSS", name: "Cross"},
        {id: "GYROID", name: "Gyroid"}
    ]

    printSequence = [
        {id: "ALL_AT_ONCE", name: "All At Once"},
        {id: "ONE_AT_A_TIME", name: "One At A Time"},
    ]
}

export default SettingForm;