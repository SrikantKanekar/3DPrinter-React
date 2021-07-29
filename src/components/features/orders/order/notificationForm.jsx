import React from 'react';
import Joi from "joi-browser";
import FormContainer from "../../../form/formContainer";
import Form from "../../../form/form";

class NotificationForm extends Form {
    state = {
        data: {subject: "", body: ""},
        errors: {},
        formError: ''
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
            this.props.onSubmit(data)
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
                onSubmit={this.handleSubmit}>
                {this.renderInput("subject", "Subject")}
                {this.renderInput("body", "Body")}
            </FormContainer>
        );
    }
}

export default NotificationForm;