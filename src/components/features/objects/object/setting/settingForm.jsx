import React from 'react';
import Form from "../../../../form/form";
import FormContainer from "../../../../form/formContainer/formContainer";
import objectService from "../../../../../services/objectService";
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
            const {data: setting} = await objectService.updateSetting(this.props.object.id, data)
            const object = {...this.props.object}
            object.setting = setting
            this.props.updateObject(object)
            this.setState({formSuccess: "Request Sent"})
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

                {this.renderInput("infillSpeed", "Infill Speed (mm/s)")}
                {this.renderInput("supportSpeed", "Support Speed (mm/s)")}
                {this.renderInput("outerWallSpeed", "Outer Wall Speed (mm/s)")}
                {this.renderInput("innerWallSpeed", "Inner Wall Speed (mm/s)")}
                {this.renderInput("topBottomSpeed", "Top Bottom Speed (mm/s)")}

                {this.renderSelect("printSequence", "Print Sequence", this.printSequence)}
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