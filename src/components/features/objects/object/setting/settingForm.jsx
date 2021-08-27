import React from 'react';
import requestService from "../../../../../services/requestService";
import FormContainer from "../../../../form/formContainer/formContainer";
import Form from "../../../../form/form";
import {schema} from "./settingSchema";

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

    schema = schema

    doSubmit = async () => {
        try {
            const {data} = this.state;
            await requestService.sendSpecialRequest(this.props.object.id, data)
            this.setState({formSuccess: "Request Sent. You will receive email with Silcing details within one working day"})
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                this.setState({formError: ex.response.data});
            }
        }
    }

    render() {
        return (
            <FormContainer
                buttonLabel="Send"
                errors={this.validate()}
                formError={this.state.formError}
                formSuccess={this.state.formSuccess}
                onSubmit={this.handleSubmit}>
                {this.renderSelect("quality", "Quality", this.quality)}

                {this.renderInput("layerHeight", "Layer Height (mm)")}

                {this.renderInput("infillDensity", "Infill Density (%)")}
                {this.renderSelect("infillPattern", "Infill Pattern", this.infillPattern)}
                {this.renderCheckbox("gradualInfill", "Gradual Infill")}

                {this.renderCheckbox("generateSupport", "Generate Support")}
                {this.renderSelect("supportStructure", "Support Structure", this.supportStructure)}
                {this.renderSelect("supportPlacement", "Support Placement", this.supportPlacement)}
                {this.renderInput("supportOverhangAngle", "Support Overhang Angle")}
                {this.renderSelect("supportPattern", "Support Pattern", this.supportPattern)}
                {this.renderInput("supportDensity", "Support Density (%)")}

                {this.renderInput("wallLineWidth", "Wall Line Width (mm)")}
                {this.renderInput("topBottomLineWidth", "Top/Bottom Line Width (mm)")}
                {this.renderInput("wallThickness", "Wall Thickness (mm)")}
                {this.renderInput("topThickness", "Top Thickness (mm)")}
                {this.renderInput("bottomThickness", "Bottom Thickness (mm)")}
                {this.renderInput("wallLineCount", "Wall Line Count")}

                {this.renderSelect("printSequence", "Print Sequence", this.printSequence)}
                {this.renderTextarea("message", "Message")}
            </FormContainer>
        )
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

export default SettingForm