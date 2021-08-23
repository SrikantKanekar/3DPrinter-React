import React from 'react';
import Form from "../../../../form/form";
import Joi from "joi-browser";
import FormContainer from "../../../../form/formContainer/formContainer";
import requestService from "../../../../../services/requestService";

class SpecialRequestForm extends Form {
    state = {
        data: {
            time: '',
            material: '',
        },
        errors: {},
        formError: '',
        formSuccess: ''
    };

    schema = {
        time: Joi.number()
            .required()
            .label("Time"),
        material: Joi.number()
            .required()
            .label("Material")
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
                {this.renderInput("time", "Print Time (min)")}
                {this.renderInput("material", "Material Weight (g)")}
            </FormContainer>
        )
    }
}

export default SpecialRequestForm;