import React, {Component, Fragment} from "react";
import styles from "../form.module.css"
import "./input.css"

class Input extends Component {
    state = {
        visible: false,
        type: this.props.type
    }

    togglePasswordVisibility = () => {
        if (this.state.visible) {
            this.setState({visible: false, type: "password"})
        } else {
            this.setState({visible: true, type: "text"})
        }
    }

    render() {
        let {name, label, error, type, ...rest} = this.props;
        const errorClass = error ? styles.alert : ''
        const passwordIcon = this.state.visible ? 'fa fa-eye-slash' : 'fa fa-eye'

        return (
            <Fragment>
                <label htmlFor={name}>{label}</label>
                <div className={errorClass} data-validate={error}>
                    {type === "password" && (
                        <span
                            className={styles.password}
                            onClick={this.togglePasswordVisibility}>
                        <i className={passwordIcon}/>
                    </span>
                    )}
                    <input
                        {...rest}
                        type={this.state.type}
                        name={name}
                        id={name}/>
                </div>
            </Fragment>
        );
    }
}

export default Input;