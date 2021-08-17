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
        const setting = this.state.data
        const level = setting.level

        const recommended = level == 0
        const basic = level >= 1
        const intermediate = level >= 2
        const advanced = level >= 3

        return (
            <FormContainer
                title="Settings"
                buttonLabel="Update"
                errors={this.validate()}
                formError={this.state.formError}
                formSuccess={this.state.formSuccess}
                onSubmit={this.handleSubmit}>

                {this.renderSelect("level", "Level", this.level)}

                {recommended && this.renderSelect("quality", "Quality", this.quality)}
                {recommended && this.renderInput("infill", "Infill (%)")}
                {recommended && this.renderCheckbox("gradualInfill", "Gradual Infill")}
                {recommended && this.renderCheckbox("support", "Support")}

                {basic && this.renderInput("layerHeight", "Layer Height (mm)")}
                {basic && this.renderInput("infillDensity", "Infill Density (%)")}
                {basic && this.renderSelect("infillPattern", "Infill Pattern", this.infillPattern)}
                {basic && this.renderCheckbox("generateSupport", "Generate Support")}
                {basic && this.renderSelect("supportStructure", "Support Structure", this.supportStructure)}
                {basic && this.renderSelect("supportPlacement", "Support Placement", this.supportPlacement)}
                {basic && this.renderInput("supportOverhangAngle", "Support Overhang Angle")}
                {basic && this.renderSelect("supportPattern", "Support Pattern", this.supportPattern)}

                {intermediate && this.renderInput("supportDensity", "Support Density (%)")}
                {advanced && this.renderInput("wallLineWidth", "Wall Line Width (mm)")}
                {advanced && this.renderInput("topBottomLineWidth", "Top/Bottom Line Width (mm)")}
                {advanced && this.renderInput("wallThickness", "Wall Thickness (mm)")}
                {advanced && this.renderInput("wallLineCount", "Wall Line Count")}
                {advanced && this.renderInput("topThickness", "Top Thickness (mm)")}
                {advanced && this.renderInput("bottomThickness", "Bottom Thickness (mm)")}
                {advanced && this.renderInput("infillSpeed", "Infill Speed (mm/s)")}
                {advanced && this.renderInput("outerWallSpeed", "Outer Wall Speed (mm/s)")}
                {advanced && this.renderInput("innerWallSpeed", "Inner Wall Speed (mm/s)")}
                {advanced && this.renderInput("topBottomSpeed", "Top Bottom Speed (mm/s)")}
                {advanced && this.renderInput("supportSpeed", "Support Speed (mm/s)")}
                {advanced && this.renderSelect("printSequence", "Print Sequence", this.printSequence)}
            </FormContainer>
        );
    }

    level = [
        {id: 0, name: "Recommended"},
        {id: 1, name: "Basic"},
        {id: 2, name: "Advanced"},
        {id: 3, name: "Expert"}
    ]

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