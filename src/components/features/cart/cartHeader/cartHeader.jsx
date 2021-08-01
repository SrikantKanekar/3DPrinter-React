import React from 'react';
import style from "./cartHeader.module.css"

function CartHeader() {
    return (
        <div className={`${style.header} clearfix`}>
            <div className={style.object}>Object</div>
            <div className={style.price}>Price</div>
            <div className={style.quantity}>Qty.</div>
        </div>
    );
}

export default CartHeader;