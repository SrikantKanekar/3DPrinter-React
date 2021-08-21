import React from 'react';
import Button from "../../../util/button/button";
import Title from "../../../util/title/title";
import styles from "./cartTotal.module.css"

function CartTotal(props) {
    const objects = props.objects

    return (
        <div className={styles.cart_total}>
            <Title>Cart total</Title>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.name}>Object</div>
                    <div className={styles.details}>
                        <div className={styles.quantity}>Qty.</div>
                        <div className={styles.price}>Price</div>
                    </div>
                </div>
                <ul className={styles.content}>
                    {objects.map(object =>
                        <li key={object.id}>

                            <div className={styles.name}>
                                {object.name}
                            </div>

                            <div className={styles.details}>
                                <div className={styles.quantity}>
                                    x<span>{object.quantity}</span>
                                </div>
                                <div className={styles.price}>
                                    <i className="fa fa-inr"/> {getObjectPrice(object)}
                                </div>
                            </div>
                        </li>
                    )}
                    <li>
                        <div className={styles.name}>Subtotal</div>
                        <div className={styles.price}>
                            <i className="fa fa-inr"/> {cartTotal(objects)}
                        </div>
                    </li>
                    <li>
                        <div className={styles.name}>Shipping</div>
                        <div className={styles.price}>Free</div>
                    </li>
                    <li>
                        <div className={styles.name}>Total</div>
                        <div className={styles.price}>
                            <i className="fa fa-inr"/> {cartTotal(objects)}
                        </div>
                    </li>
                </ul>
            </div>
            <div className={styles.checkout}>
                <Button
                    label="Proceed to checkout"
                    url="/checkout"
                />
            </div>
        </div>
    );
}

function cartTotal(objects) {
    let total = 0
    objects.forEach((object) => {
        total += object.quantity * getObjectPrice(object)
    })
    return total
}

function getObjectPrice(object) {
    const quality = object.quality
    if (quality === "SUPER") return object.slicing._super.price
    else if (quality === "DYNAMIC") return object.slicing.dynamic.price
    else if (quality === "STANDARD") return object.slicing.standard.price
    else if (quality === "LOW") return object.slicing.low.price
    else if (quality === "CUSTOM") return object.slicing.custom.price
}

export default CartTotal;