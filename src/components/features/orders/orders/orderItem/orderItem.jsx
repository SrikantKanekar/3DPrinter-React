import React from 'react';
import {Link} from "react-router-dom";
import styles from "./orderItem.module.css"

function OrderItem(props) {
    return (
        <div className={styles.item}>

            <div className={styles.order}>
                <div className={styles.name}>
                    <Link to={`/orders/${props.order._id}`}>{props.order.name}</Link>
                </div>
                <div className={styles.objects}>
                    {props.order.objectIds.length} objects
                </div>
            </div>

            <div className={styles.content}>
                <div>{props.order.status}</div>
                <div><i className="fa fa-inr"/>{props.order.price}</div>
                <div>{deliveredDate(props.order)}</div>
            </div>
        </div>
    );
}

function deliveredDate(order) {
    const date = order.deliveredOn
    return date ? new Date(date).toLocaleDateString() : 'NO'
}

export default OrderItem;