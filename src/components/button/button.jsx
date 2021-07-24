import React, {Component} from 'react';
import {Link} from "react-router-dom";
import "./button.css"

class Button extends Component {
    render() {
        const {url, label, errors, onClick} = this.props
        const buttonClass = errors ? 'button disabled' : 'button'

        return (
            <div className={buttonClass}>
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