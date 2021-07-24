import React, {Fragment} from "react";
import "./select.css"

const Select = ({name, label, options, error, ...rest}) => {
    const errorClass = error ? 'alert-validate' : ''

    return (
        <Fragment>
            <label htmlFor={name}>{label}</label>
            <div className={errorClass} data-validate={error}>
                <select name={name} id={name} {...rest}
                        className="dropdown_item_select input">
                    <option value=""/>
                    {options.map(option => (
                        <option key={option._id} value={option._id}>
                            {option.name}
                        </option>
                    ))}
                </select>
            </div>
        </Fragment>
    );
};

export default Select;