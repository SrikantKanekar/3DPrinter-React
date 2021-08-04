import React, {Fragment} from "react";
import styles from "../form.module.css"
import "./select.css"

const Select = ({name, label, options, value, error, ...rest}) => {
    const errorClass = error ? styles.alert : ''

    return (
        <Fragment>
            <label htmlFor={name}>{label}</label>

            <div className={errorClass} data-validate={error}>
                <select
                    {...rest}
                    name={name}
                    value={value}
                    id={name}>

                    <option hidden value=""/>
                    {options.map(option => (
                        <option
                            key={option.id}
                            value={option.id}>
                            {option.name}
                        </option>
                    ))}
                </select>
            </div>
        </Fragment>
    );
};

export default Select;