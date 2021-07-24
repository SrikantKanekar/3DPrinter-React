import React, {Component, Fragment} from 'react';
import Button from "../button/button";
import "./form.css"

class FormContainer extends Component {
    render() {
        const {title, button, errors, formError, children, onSubmit} = this.props
        return (
            <Fragment>
                <div className="row form_title">{title}</div>
                <div className="form_container">
                    <form onSubmit={this.handleSubmit}>
                        {children}
                    </form>
                    <div className="form_message">{formError}</div>
                    <div className="form_button">
                        <Button
                            label={button}
                            errors={errors}
                            onClick={onSubmit}
                        />
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default FormContainer;