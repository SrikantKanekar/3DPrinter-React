import React, {Fragment} from "react";
import "./select.css"

const Select = ({name, label, options, value, error, ...rest}) => {
    const errorClass = error ? 'alert-validate' : ''

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