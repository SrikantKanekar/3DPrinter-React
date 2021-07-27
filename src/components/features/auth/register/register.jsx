import React, {Component} from 'react';
import {Link} from "react-router-dom";
import RegisterForm from "./registerForm";
import "../auth.css"

class Register extends Component {
    render() {
        return (
            <div className="auth_container col-lg-4 col-md-6 col-sm-8">
                <RegisterForm {...this.props}/>

                <div className="col text_container">
                    <span className="txt2">Already have an account? </span>
                    <Link to="/login" className="txt3">
                        Sign in now
                    </Link>
                </div>
            </div>
        );
    }
}

export default Register;