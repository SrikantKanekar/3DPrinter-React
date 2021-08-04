import React, {Component, Fragment} from 'react';
import Button from "../../util/button/button";
import Title from "../../util/title/title";
import Subtitle from "../../util/subtitle/subtitle";
import styles from "./formContainer.module.css"

class FormContainer extends Component {
    render() {
        const {title, subtitle, buttonLabel, errors, formError, formSuccess, children, onSubmit, center} = this.props

        return (
            <Fragment>
                <Title center={center}>{title}</Title>
                <Subtitle>{subtitle}</Subtitle>

                <div className={styles.content}>

                    <form onSubmit={this.handleSubmit}>
                        {children}
                    </form>

                    {formError && <div className={styles.error}>{formError}</div>}
                    {formSuccess && <div className={styles.success}>{formSuccess}</div>}

                    {buttonLabel && (
                        <div className={styles.button}>
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