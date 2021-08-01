import React, {Component} from 'react';
import styles from "./subtitle.module.css"

class Subtitle extends Component {
    render() {
        return (
            <div className={styles.subtitle}>
                {this.props.children}
            </div>
        );
    }
}

export default Subtitle;