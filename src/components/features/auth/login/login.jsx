import React, {Component} from 'react';
import LoginForm from "./loginForm";
import {Link} from "react-router-dom";
import "../auth.css"

class Login extends Component {
    render() {
        return (
            <div className="auth_container col-lg-4 col-md-6 col-sm-8">
                <LoginForm {...this.props}/>

                <div className="col text_container">
					<span className="txt2">Don’t have an account? </span>
                    <Link to="/register" className="txt3">
                        Sign up now
                    </Link>
                </div>
            </div>
        );
    }
}

export default Login;