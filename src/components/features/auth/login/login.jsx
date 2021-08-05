import React, {Component} from 'react';
import LoginForm from "./loginForm";
import {Link} from "react-router-dom";
import styles from "../auth.module.css"

class Login extends Component {
    render() {
        return (
            <div className={`${styles.container} col-lg-4 col-md-6 col-sm-8`}>
                <LoginForm {...this.props}/>

                <div className={`col ${styles.content}`}>
					<span className={styles.txt2}>Don’t have an account? </span>
                    <Link to="/register" className={styles.txt3}>
                        Sign up now
                    </Link>
                </div>
            </div>
        );
    }
}

export default Login;