import React from 'react';
import requestService from "../../../../../services/requestService";
import FormContainer from "../../../../form/formContainer/formContainer";
import Title from "../../../../util/title/title";
import {directRequestSchema} from "./directRequestSchema";
import Form from "../../../../form/form";

class DirectRequestForm extends Form {
    state = {
        data: {
            super_time: '',
            super_material: '',
            dynamic_time: '',
            dynamic_material: '',
            standard_time: '',
            standard_material: '',
            low_time: '',
            low_material: '',
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
                    time: data.super_time,
                    material: data.super_material,
                },
                dynamic: {
                    time: data.dynamic_time,
                    material: data.dynamic_material,
                },
                standard: {
                    time: data.standard_time,
                    material: data.standard_material,
                },
                low: {
                    time: data.low_time,
                    material: data.low_material,
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
                buttonLabel="Create Object"
                errors={this.validate()}
                formError={this.state.formError}
                formSuccess={this.state.formSuccess}
                onSubmit={this.handleSubmit}>
                <Title>Super</Title>
                {this.renderInput("super_time", "Print Time (hr min sec)")}
                {this.renderInput("super_material", "Material Weight (g)")}

                <Title>Dynamic</Title>
                {this.renderInput("dynamic_time", "Print Time (hr min sec)")}
                {this.renderInput("dynamic_material", "Material Weight (g)")}

                <Title>Standard</Title>
                {this.renderInput("standard_time", "Print Time (hr min sec)")}
                {this.renderInput("standard_material", "Material Weight (g)")}

                <Title>Low</Title>
                {this.renderInput("low_time", "Print Time (hr min sec)")}
                {this.renderInput("low_material", "Material Weight (g)")}
            </FormContainer>
        )
    }
}

export default DirectRequestForm;