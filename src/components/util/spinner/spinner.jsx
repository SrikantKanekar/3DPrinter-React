import React from 'react';
import {usePromiseTracker} from "react-promise-tracker";
import styles from "./spinner.module.css"

function Spinner() {
    const {promiseInProgress} = usePromiseTracker();

    return (
        <div
            className={styles.container}
            style={{display: promiseInProgress ? 'flex' : 'none'}}>
            <span className={styles.spinner}/>
        </div>
    );
}

export default Spinner;