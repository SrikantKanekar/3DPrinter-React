import React, {Component} from 'react';
import Joi from "joi-browser";
import Form from "../../../form/form";
import FormContainer from "../../../form/formContainer";

class ContactUsForm extends Form {
    state = {
        data: {name: "", email: "", subject: "", message: ""},
        errors: {},
        formError: '',
        formSuccess: ''
    };

    schema = {
        name: Joi.string()
            .required()
            .label("Name"),
        email: Joi.string()
            .required()
            .email()
            .label("Email"),
        subject: Joi.string()
            .required()
            .label("Subject"),
        message: Joi.string()
            .required()
            .label("message")
    };

    doSubmit = async () => {
        try {
            this.setState({formSuccess: "Successfully Sent"})
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                this.setState({formError: ex.response.data});
            }
        }
    };

    render() {
        return (
            <FormContainer
                buttonLabel="Send"
                errors={this.validate()}
                formError={this.state.formError}
                formSuccess={this.state.formSuccess}
                onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="col-xl-6">
                        {this.renderInput("name", "Name")}
                    </div>
                    <div className="col-xl-6">
                        {this.renderInput("email", "Email", "email")}
                    </div>
                </div>
                {this.renderInput("subject", "Subject")}
                {this.renderTextarea("message", "Message")}
            </FormContainer>
        );
    }
}

export default ContactUsForm;