import React from 'react';
import Joi from "joi-browser";
import Form from "../../../form/form";
import auth from "../../../../services/authService";
import FormContainer from "../../../form/formContainer";

class SettingForm extends Form {
    state = {
        data: {email: "", username: "", select: "name2", checkbox: ""},
        errors: {},
        formError: ''
    };

    schema = {
        email: Joi.string()
            .required()
            .email()
            .label("Email"),
        username: Joi.string()
            .required()
            .min(3)
            .max(55)
            .label("Username"),
        select: Joi.string()
            .label("Select"),
        checkbox: Joi.boolean()
            .label("Confirm Password")
    };

    doSubmit = async () => {
        try {
            await auth.register(this.state.data);
            window.location = "/";
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
                button="Update"
                errors={this.validate()}
                formError={this.state.formError}
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