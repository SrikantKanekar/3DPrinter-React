import React from 'react';
import Joi from "joi-browser";
import Form from "../../../form/form";
import FormContainer from "../../../form/formContainer";
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
            await objectService.updateSetting(this.props.object.id, data)
            this.setState({formSuccess: "Successfully Updated"})
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                this.setState({formError: ex.response.data});
            }
        }
    };

    options = [
        {id: "1", name: "name1"},
        {id: "2", name: "name2"},
    ]

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

                {this.renderSelect("quality", "Quality", this.options)}
                {this.renderInput("infill", "Infill (%)")}
                {this.renderCheckbox("gradualInfill", "Gradual Infill")}
                {this.renderCheckbox("support", "Support")}

                {this.renderInput("layerHeight", "Layer Height (mm)")}
                {this.renderInput("infillDensity", "Infill Density (%)")}
                {this.renderSelect("infillPattern", "Infill Pattern", this.options)}
                {this.renderCheckbox("generateSupport", "Generate Support")}
                {this.renderSelect("supportStructure", "Support Structure", this.options)}
                {this.renderSelect("supportPlacement", "Support Placement", this.options)}
                {this.renderInput("supportOverhangAngle", "Support Overhang Angle")}
                {this.renderSelect("supportPattern", "Support Pattern", this.options)}

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
                {this.renderSelect("printSequence", "Print Sequence", this.options)}
            </FormContainer>
        );
    }
}

export default SettingForm;