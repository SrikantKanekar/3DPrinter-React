import React, {Component} from 'react';
import {Link} from "react-router-dom";
import styles from "./button.module.css"

class Button extends Component {
    render() {
        const {url, label, errors, completed, onClick} = this.props

        const isDisabled = errors ? styles.disabled : ''
        const isCompleted = completed ? styles.completed : ''

        return (
            <div className={`${styles.button} ${isCompleted} ${isDisabled}`}>
                {url && (
                    <Link to={url}>{label}</Link>
                )}
                {!url && (
                    <button onClick={onClick}>{label}</button>
                )}
            </div>
        );
    }
}

export default Button;