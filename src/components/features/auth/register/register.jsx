import React, {Component} from 'react';
import {Link} from "react-router-dom";
import RegisterForm from "./registerForm";
import styles from "../auth.module.css"

class Register extends Component {
    render() {
        return (
            <div className={`${styles.container} col-lg-4 col-md-6 col-sm-8`}>
                <RegisterForm {...this.props}/>

                <div className={`col ${styles.content}`}>
                    <span className={styles.txt2}>Already have an account? </span>
                    <Link to="/login" className={styles.txt3}>
                        Sign in now
                    </Link>
                </div>
            </div>
        );
    }
}

export default Register;