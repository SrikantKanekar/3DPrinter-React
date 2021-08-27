import React, {Fragment} from 'react';
import {toast} from "react-toastify";
import Button from "../../../util/button/button";
import Title from "../../../util/title/title";
import Subtitle from "../../../util/subtitle/subtitle";
import styles from "./couponForm.module.css"

function CouponForm() {
    return (
        <Fragment>
            <Title>Coupon code</Title>
            <Subtitle>Enter your coupon code</Subtitle>
            <div className={styles.container}>
                <form className={styles.form}>
                    <input type="text" className={styles.input}/>
                    <div className={styles.button}>
                        <Button label="Apply" onClick={e => handleCouponSubmit(e)}/>
                    </div>
                </form>
            </div>
        </Fragment>
    );
}

function handleCouponSubmit(e) {
    e.preventDefault()
    toast.dark("Invalid coupon id")
}

export default CouponForm;