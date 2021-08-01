import React, {Component} from 'react';
import styles from "./spinner.module.css"

class Spinner extends Component {
    render() {
        return (
            <div className={styles.container}>
                <span className={styles.spinner}/>
            </div>
        );
    }
}

export default Spinner;