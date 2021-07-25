import React from 'react';
import Form from "../../components/form/form";
import FormContainer from "../../components/form/formContainer";
import Joi from "joi-browser";
import account from "../../services/accountService";

class AccountUpdateForm extends Form {
    state = {
        data: {username: this.props.user.username},
        errors: {},
        formError: ''
    };

    schema = {
        username: Joi.string()
            .required()
            .min(3)
            .max(50)
            .label("Username")
    }

    doSubmit = async () => {
        try {
            const {data} = this.state;
            await account.update(data)
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                this.setState({formError: ex.response.data});
            }
        }
    }

    render() {
        return (
            <FormContainer
                button="Update"
                errors={this.validate()}
                formError={this.state.formError}
                onSubmit={this.handleSubmit}>
                {this.renderInput("username", "Username")}
            </FormContainer>
        );
    }
}

export default AccountUpdateForm;