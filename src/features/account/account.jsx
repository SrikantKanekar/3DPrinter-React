import React, {Component} from 'react';
import "./account.css"

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
                        <form className="form" action="/account/update" method="POST" id="update_form">
                            <label htmlFor="username">Username</label>
                            <div data-validate="Please enter username">
                                <input name="username" id="username" value={username} type="text" className="input"
                                       required="required"/>
                            </div>
                            <div className="form_message"/>

                            <div id="update_button" className="button form_submit_button">
                                <a href="#">Update</a>
                            </div>
                        </form>
                    </div>
                </div>

                <button className="collapsible">Change password</button>
                <div className="collapsible_content col-lg-10">
                    <div className="change_password_form_container">
                        <form className="form" action="/account/reset-password" method="POST" id="change_password_form">
                            <div data-validate="Please enter password">
                                <input name="old_password" type="password" className="input" placeholder="Old Password"
                                       required="required"/>
                            </div>

                            <div data-validate="Please enter password">
						<span className="btn-show-pass">
							<i className="fa fa fa-eye"/>
						</span>
                                <input name="new_password" type="password" className="input" placeholder="New Password"
                                       required="required"/>
                            </div>

                            <div data-validate="Please enter password">
                                <input name="confirm_password" type="password" className="input"
                                       placeholder="Confirm Password"
                                       required="required"/>
                            </div>

                            <div className="form_message"/>

                            <div id="change_password_button" className="button form_submit_button">
                                <a href="#">Change Password</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Account;