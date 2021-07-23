import React from "react";
import Joi from "joi-browser";
import Form from "../../components/form/form";
import auth from "./authService";

class RegisterForm extends Form {
    state = {
        data: { email: "", username: "", password1: "", password2: "" },
        errors: {}
    };

    schema = {
        email: Joi.string()
            .required()
            .email()
            .label("Email"),
        username: Joi.string()
            .required()
            .min(3)
            .max(50)
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
                const errors = { ...this.state.errors };
                errors.email = ex.response.data;
                this.setState({ errors });
            }
        }
    };

    render() {
        return (
            <div>
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("email", "Email", "email")}
                    {this.renderInput("username", "Username")}
                    {this.renderInput("password1", "Password", "password")}
                    {this.renderInput("password2", "Confirm Password", "password")}
                    {this.renderButton("Register")}
                </form>
            </div>
        );
    }
}

export default RegisterForm;
