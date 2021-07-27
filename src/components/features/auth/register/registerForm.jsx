import React from "react";
import Joi from "joi-browser";
import Form from "../../../form/form";
import auth from "../../../../services/authService";
import FormContainer from "../../../form/formContainer";

class RegisterForm extends Form {
    state = {
        data: {email: "", username: "", password1: "", password2: ""},
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
        password1: Joi.string()
            .required()
            .min(5)
            .label("Password"),
        password2: Joi.string()
            .required()
            .min(5)
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

    render() {
        return (
            <FormContainer
                title="Register"
                button="Register"
                errors={this.validate()}
                formError={this.state.formError}
                onSubmit={this.handleSubmit}>
                {this.renderInput("email", "Email", "email")}
                {this.renderInput("username", "Username")}
                {this.renderInput("password1", "Password", "password")}
                {this.renderInput("password2", "Confirm Password", "password")}
            </FormContainer>
        );
    }
}

export default RegisterForm;
