import React from 'react';
import requestService from "../../../../../services/requestService";
import FormContainer from "../../../../form/formContainer/formContainer";
import Title from "../../../../util/title/title";
import {directRequestSchema} from "./directRequestSchema";
import Form from "../../../../form/form";

class DirectRequestForm extends Form {
    state = {
        data: {
            super_printTime: '',
            super_materialWeight: '',
            super_filament: '',
            super_materialCost: '',
            super_powerCost: '',
            super_labourCost: '',
            super_price: '',
            dynamic_printTime: '',
            dynamic_materialWeight: '',
            dynamic_filament: '',
            dynamic_materialCost: '',
            dynamic_powerCost: '',
            dynamic_labourCost: '',
            dynamic_price: '',
            standard_printTime: '',
            standard_materialWeight: '',
            standard_filament: '',
            standard_materialCost: '',
            standard_powerCost: '',
            standard_labourCost: '',
            standard_price: '',
            low_printTime: '',
            low_materialWeight: '',
            low_filament: '',
            low_materialCost: '',
            low_powerCost: '',
            low_labourCost: '',
            low_price: '',
            custom_printTime: '',
            custom_materialWeight: '',
            custom_filament: '',
            custom_materialCost: '',
            custom_powerCost: '',
            custom_labourCost: '',
            custom_price: '',
        },
        errors: {},
        formError: '',
        formSuccess: ''
    };

    schema = directRequestSchema

    doSubmit = async () => {
        try {
            const {data} = this.state;
            const body = {
                _super: {
                    printTime: data.super_printTime,
                    materialWeight: data.super_materialWeight,
                    filament: data.super_filament,
                    materialCost: data.super_materialCost,
                    powerCost: data.super_powerCost,
                    labourCost: data.super_labourCost,
                    price: data.super_price,
                },
                dynamic: {
                    printTime: data.dynamic_printTime,
                    materialWeight: data.dynamic_materialWeight,
                    filament: data.dynamic_filament,
                    materialCost: data.dynamic_materialCost,
                    powerCost: data.dynamic_powerCost,
                    labourCost: data.dynamic_labourCost,
                    price: data.dynamic_price,
                },
                standard: {
                    printTime: data.standard_printTime,
                    materialWeight: data.standard_materialWeight,
                    filament: data.standard_filament,
                    materialCost: data.standard_materialCost,
                    powerCost: data.standard_powerCost,
                    labourCost: data.standard_labourCost,
                    price: data.standard_price,
                },
                low: {
                    printTime: data.low_printTime,
                    materialWeight: data.low_materialWeight,
                    filament: data.low_filament,
                    materialCost: data.low_materialCost,
                    powerCost: data.low_powerCost,
                    labourCost: data.low_labourCost,
                    price: data.low_price,
                },
                custom: {
                    printTime: data.custom_printTime,
                    materialWeight: data.custom_materialWeight,
                    filament: data.custom_filament,
                    materialCost: data.custom_materialCost,
                    powerCost: data.custom_powerCost,
                    labourCost: data.custom_labourCost,
                    price: data.custom_price,
                }
            }
            await requestService.fulfillDirect(this.props.id, body)
            this.setState({formSuccess: "Successfully Created"})
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                this.setState({formError: ex.response.data});
            }
        }
    };

    render() {
        return (
            <FormContainer
                title="Fill Slicing Details"
                buttonLabel="Create"
                errors={this.validate()}
                formError={this.state.formError}
                formSuccess={this.state.formSuccess}
                onSubmit={this.handleSubmit}>
                <Title>Super</Title>
                {this.renderInput("super_printTime", "Print Time (hr min sec)")}
                {this.renderInput("super_materialWeight", "Material Weight (g)")}
                {this.renderInput("super_filament", "Filament (m)")}
                {this.renderInput("super_materialCost", "Material Cost")}
                {this.renderInput("super_powerCost", "Power Cost")}
                {this.renderInput("super_labourCost", "Labour Cost")}
                {this.renderInput("super_price", "Total Price")}

                <Title>Dynamic</Title>
                {this.renderInput("dynamic_printTime", "Print Time (hr min sec)")}
                {this.renderInput("dynamic_materialWeight", "Material Weight (g)")}
                {this.renderInput("dynamic_filament", "Filament (m)")}
                {this.renderInput("dynamic_materialCost", "Material Cost")}
                {this.renderInput("dynamic_powerCost", "Power Cost")}
                {this.renderInput("dynamic_labourCost", "Labour Cost")}
                {this.renderInput("dynamic_price", "Total Price")}

                <Title>Standard</Title>
                {this.renderInput("standard_printTime", "Print Time (hr min sec)")}
                {this.renderInput("standard_materialWeight", "Material Weight (g)")}
                {this.renderInput("standard_filament", "Filament (m)")}
                {this.renderInput("standard_materialCost", "Material Cost")}
                {this.renderInput("standard_powerCost", "Power Cost")}
                {this.renderInput("standard_labourCost", "Labour Cost")}
                {this.renderInput("standard_price", "Total Price")}

                <Title>Low</Title>
                {this.renderInput("low_printTime", "Print Time (hr min sec)")}
                {this.renderInput("low_materialWeight", "Material Weight (g)")}
                {this.renderInput("low_filament", "Filament (m)")}
                {this.renderInput("low_materialCost", "Material Cost")}
                {this.renderInput("low_powerCost", "Power Cost")}
                {this.renderInput("low_labourCost", "Labour Cost")}
                {this.renderInput("low_price", "Total Price")}

                <Title>Custom (Optional)</Title>
                {this.renderInput("custom_printTime", "Print Time (hr min sec)")}
                {this.renderInput("custom_materialWeight", "Material Weight (g)")}
                {this.renderInput("custom_filament", "Filament (m)")}
                {this.renderInput("custom_materialCost", "Material Cost")}
                {this.renderInput("custom_powerCost", "Power Cost")}
                {this.renderInput("custom_labourCost", "Labour Cost")}
                {this.renderInput("custom_price", "Total Price")}
            </FormContainer>
        )
    }
}

export default DirectRequestForm;