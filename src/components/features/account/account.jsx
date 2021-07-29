import React, {Component} from 'react';
import auth from "../../../services/authService";
import AccountUpdateForm from "./accountUpdateForm";
import ResetPasswordForm from "./resetPasswordForm";
import "./account.css"

class Account extends Component {
    state = {
        user: ''
    }

    componentDidMount() {
        const user = auth.getCurrentUser()
        this.setState({user})
    }

    render() {
        const {user} = this.state

        return (
            <div className="container">

                <div className="account_detail_container">
                    <p>Username : {user.username}</p>
                    <p>Email : {user.email}</p>
                </div>

                <button className="collapsible">Update Account</button>
                <div className="collapsible_content col-lg-10">
                    <div className="update_form_container">
                        <AccountUpdateForm />
                    </div>
                </div>

                <button className="collapsible">Change password</button>
                <div className="collapsible_content col-lg-10">
                    <div className="change_password_form_container">
                        <ResetPasswordForm/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Account;