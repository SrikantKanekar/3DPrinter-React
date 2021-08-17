import React, {Component} from 'react';
import styles from "./checkbox.module.css"

class Checkbox extends Component {
    state = {
        checked: this.props.value
    }

    handleClick = (e) => {
        this.setState({checked: e.target.checked})
        this.props.onChange(e)
    }

    render() {
        const {name, label, ...rest} = this.props
        const checked = this.state.checked ? 'checked' : ''
        return (
            <label className={styles.checkbox_container}>{label}
                <input
                    {...rest}
                    type="checkbox"
                    id={name}
                    name={name}
                    checked={checked}
                    value={this.state.checked}
                    onClick={e => this.handleClick(e)}/>
                <span className={styles.checkmark}/>
            </label>
        );
    }
}

export default Checkbox;