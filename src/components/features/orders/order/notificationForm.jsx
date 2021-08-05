import React from 'react';
import Joi from "joi-browser";
import FormContainer from "../../../form/formContainer/formContainer";
import Form from "../../../form/form";
import admin from "../../../../services/adminService";

class NotificationForm extends Form {
    state = {
        data: {subject: "", body: ""},
        errors: {},
        formError: '',
        formSuccess: ''
    };

    schema = {
        subject: Joi.string()
            .required()
            .label("Subject"),
        body: Joi.string()
            .required()
            .label("Body")
    };

    doSubmit = async () => {
        try {
            const {data} = this.state;
            const notification = {
                email: this.props.email,
                subject: data.subject,
                body: data.body
            }
            await admin.sendNotification(notification)
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
                title="Message Notification"
                subtitle="Send custom notification to the user"
                buttonLabel="Send"
                errors={this.validate()}
                formError={this.state.formError}
                formSuccess={this.state.formSuccess}
                onSubmit={this.handleSubmit}>
                {this.renderInput("subject", "Subject")}
                {this.renderTextarea("body", "Body")}
            </FormContainer>
        );
    }
}

export default NotificationForm;