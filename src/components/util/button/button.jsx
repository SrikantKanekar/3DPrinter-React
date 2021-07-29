import React, {Component} from 'react';
import {Link} from "react-router-dom";
import "./button.css"

class Button extends Component {
    render() {
        const {url, label, errors, completed, onClick} = this.props

        return (
            <div className={`button ${completed? 'completed': ''} ${errors? 'disabled': ''}`}>
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