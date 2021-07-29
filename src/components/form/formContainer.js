import React, {Component, Fragment} from 'react';
import Button from "../util/button/button";
import "./form.css"
import Title from "../util/title/title";
import Subtitle from "../util/subtitle/subtitle";

class FormContainer extends Component {
    render() {
        const {title, subtitle, buttonLabel, errors, formError, formSuccess, children, onSubmit, center} = this.props

        return (
            <Fragment>
                <Title center={center}>{title}</Title>
                <Subtitle>{subtitle}</Subtitle>

                <div className="form_container">

                    <form onSubmit={this.handleSubmit}>
                        {children}
                    </form>

                    {formError && <div className="form_error">{formError}</div>}
                    {formSuccess && <div className="form_success">{formSuccess}</div>}

                    {buttonLabel && (
                        <div className="form_button">
                            <Button
                                label={buttonLabel}
                                errors={errors}
                                onClick={onSubmit}
                            />
                        </div>
                    )}
                </div>
            </Fragment>
        );
    }
}

export default FormContainer;