import React from 'react';
import Form from "../../../../form/form";
import Joi from "joi-browser";
import FormContainer from "../../../../form/formContainer/formContainer";
import requestService from "../../../../../services/requestService";

class SpecialRequestForm extends Form {
    state = {
        data: {
            printTime: '',
            materialWeight: '',
            filament: '',
            materialCost: '',
            powerCost: '',
            labourCost: '',
            price: ''
        },
        errors: {},
        formError: '',
        formSuccess: ''
    };

    schema = {
        printTime: Joi.string()
            .required()
            .label("Print Time"),
        materialWeight: Joi.number()
            .required()
            .label("Material Weight"),
        filament: Joi.number()
            .required()
            .label("Filament"),
        materialCost: Joi.number()
            .required()
            .label("Material Cost"),
        powerCost: Joi.number()
            .required()
            .label("Power Cost"),
        labourCost: Joi.number()
            .required()
            .label("Labour Cost"),
        price: Joi.number()
            .required()
            .label("Price"),
    };

    doSubmit = async () => {
        try {
            const {data} = this.state;
            await requestService.fulfillSpecial(this.props.id, data)
            this.setState({formSuccess: "Successfully Posted"})
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                this.setState({formError: ex.response.data});
            }
        }
    };

    render() {
        return (
            <FormContainer
                title="Slicing Details"
                buttonLabel="Post"
                errors={this.validate()}
                formError={this.state.formError}
                formSuccess={this.state.formSuccess}
                onSubmit={this.handleSubmit}>
                {this.renderInput("printTime", "Print Time (hr min sec)")}
                {this.renderInput("materialWeight", "Material Weight (g)")}
                {this.renderInput("filament", "Filament (m)")}
                {this.renderInput("materialCost", "Material Cost")}
                {this.renderInput("powerCost", "Power Cost")}
                {this.renderInput("labourCost", "Labour Cost")}
                {this.renderInput("price", "Total Price")}
            </FormContainer>
        )
    }
}

export default SpecialRequestForm;