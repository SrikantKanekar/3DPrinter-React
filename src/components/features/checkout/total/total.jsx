import React from 'react';
import Button from "../../../util/button/button";
import Title from "../../../util/title/title";
import Subtitle from "../../../util/subtitle/subtitle";
import styles from "./total.module.css"

function Total(props) {
    return (
        <div className={styles.total}>
            <Title>Your order</Title>
            <Subtitle>Order details</Subtitle>

            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.name}>Object</div>
                    <div className={styles.details}>
                        <div>Qty.</div>
                        <div>Price</div>
                    </div>
                </div>
                <ul className={styles.list}>
                    {props.objects.map(object =>
                        <li key={object.id}>
                            <div className={styles.name}>{object.name}</div>
                            <div className={styles.details}>
                                <div>X{object.quantity}</div>
                                <div>
                                    <i className="fa fa-inr"/> {getObjectPrice(object)}
                                </div>
                            </div>
                        </li>
                    )}
                    <li>
                        <div>Subtotal</div>
                        <div>
                            <i className="fa fa-inr"/> {calculateTotal(props.objects)}
                        </div>
                    </li>
                    <li>
                        <div>Shipping</div>
                        <div>Free</div>
                    </li>
                    <li>
                        <div>Total</div>
                        <div>
                            <i className="fa fa-inr"/> {calculateTotal(props.objects)}
                        </div>
                    </li>
                </ul>
            </div>
            <div className={styles.button}>
                <Button label="Place Order" onClick={props.handleSubmit}/>
            </div>
        </div>
    );
}

function calculateTotal(objects) {
    let total = 0
    objects.forEach((object) => {
        total += object.quantity * getObjectPrice(object)
    })
    return total
}

function getObjectPrice(object){
    const quality = object.quality
    if (quality === "SUPER") return object.slicing._super.price
    else if (quality === "DYNAMIC") return object.slicing.dynamic.price
    else if (quality === "STANDARD") return object.slicing.standard.price
    else if (quality === "LOW") return object.slicing.low.price
    else if (quality === "CUSTOM") return object.slicing.custom.price
}

export default Total;