import React from 'react';
import requestService from "../../../../services/requestService";
import FormContainer from "../../../form/formContainer/formContainer";
import Form from "../../../form/form";
import Joi from "joi-browser";

class RequestForm extends Form {

    constructor(props) {
        super(props)
        this.state = {
            data: {
                message: props.object.message,
                edit: !!props.object.message
            },
            errors: {},
            formError: '',
            formSuccess: ''
        }
    }

    schema = {
        message: Joi.string()
    }

    doSubmit = async () => {
        try {
            const {data} = this.state;
            await requestService.sendSpecialRequest(this.props.object.id, data)
            this.setState({formSuccess: "Request Sent. You will receive email with Silcing details soon"})
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                this.setState({formError: ex.response.data});
            }
        }
    }

    render() {
        return (
            <FormContainer
                buttonLabel={this.state.edit ? 'Edit' : 'Send'}
                errors={this.validate()}
                formError={this.state.formError}
                formSuccess={this.state.formSuccess}
                onSubmit={this.handleSubmit}>
                {this.renderTextarea("message", "Message")}
            </FormContainer>
        )
    }
}

export default RequestForm