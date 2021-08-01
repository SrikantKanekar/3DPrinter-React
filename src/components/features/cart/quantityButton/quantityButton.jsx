import React from 'react';
import style from "./quantityButton.module.css"

function QuantityButton(props) {
    return (
        <div className={style.quantity}>
            <span>Qty</span>

            <div className={style.value}>
                {props.object.quantity}
            </div>

            <div className={style.buttons}>
                <div className={style.increase}
                     onClick={() => props.handleQuantityIncrease(props.object)}>
                    <i className="fa fa-chevron-up" aria-hidden="true"/>
                </div>

                <div className={style.decrease}
                     onClick={() => props.handleQuantityDecrease(props.object)}>
                    <i className="fa fa-chevron-down" aria-hidden="true"/>
                </div>
            </div>
        </div>
    );
}

export default QuantityButton;