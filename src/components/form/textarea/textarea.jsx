import React, {Component, Fragment} from 'react';
import "./textarea.css"

class Textarea extends Component {
    render() {
        let {name, label, error, ...rest} = this.props;
        const errorClass = error ? 'alert-validate' : ''

        return (
            <Fragment>
                <label htmlFor={name}>{label}</label>
                <div className={errorClass} data-validate={error}>
                    <textarea
                        {...rest}
                        name={name}
                        id={name}
                        rows="7"/>
                </div>
            </Fragment>
        );
    }
}

export default Textarea;