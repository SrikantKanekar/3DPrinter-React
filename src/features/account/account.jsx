import React, {Component} from 'react';
import "./account.css"
import AccountUpdateForm from "./accountUpdateForm";
import ResetPasswordForm from "./resetPasswordForm";

class Account extends Component {
    render() {
        const {username, email} = this.props.user

        return (
            <div className="container">

                <div className="account_detail_container">
                    <p>Username : {username}</p>
                    <p>Email : {email}</p>
                </div>

                <button className="collapsible">Update Account</button>
                <div className="collapsible_content col-lg-10">
                    <div className="update_form_container">
                        <AccountUpdateForm user={this.props.user}/>
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