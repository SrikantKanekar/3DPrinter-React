import React from 'react';
import Form from "../../form/form";
import FormContainer from "../../form/formContainer";
import auth from "../../../services/authService";
import Joi from "joi-browser";

class ResetPasswordForm extends Form {
    state = {
        data: {oldPassword: "", newPassword: "", confirmPassword: ""},
        errors: {},
        formError: '',
        formSuccess: ''
    };

    schema={
        oldPassword: Joi.string()
            .required()
            .label("Password"),
        newPassword: Joi.string()
            .required()
            .min(4)
            .label("Password"),
        confirmPassword: Joi.string()
            .required()
            .min(4)
            .label("Password")
    }

    doSubmit = async () => {
        try {
            const {data} = this.state;
            await auth.resetPassword(data)
            this.setState({formSuccess: "Successfully Updated"})
        } catch (e) {
            if (e.response && e.response.status === 400) {
                this.setState({formError: e.response.data});
            }
        }
    }

    render() {
        return (
            <FormContainer
                buttonLabel="Reset"
                errors={this.validate()}
                formError={this.state.formError}
                formSuccess={this.state.formSuccess}
                onSubmit={this.handleSubmit}>
                {this.renderInput("oldPassword", "Old Password", "password")}
                {this.renderInput("newPassword", "New Password", "password")}
                {this.renderInput("confirmPassword", "Confirm Password", "password")}
            </FormContainer>
        );
    }
}

export default ResetPasswordForm;