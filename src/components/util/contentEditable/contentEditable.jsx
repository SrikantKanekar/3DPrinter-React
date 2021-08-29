import React, {Component, Fragment} from 'react';
import styles from "./contentEditable.module.css"

class ContentEditable extends Component {
    render() {
        return (
            <Fragment>
                <input
                    className={styles.content}
                    type="text"
                    value={this.props.value}
                    onChange={e => this.props.onChange(e.currentTarget.value)}
                />
            </Fragment>
        );
    }
}

export default ContentEditable;