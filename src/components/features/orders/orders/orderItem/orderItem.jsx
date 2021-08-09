import React from 'react';
import {Link} from "react-router-dom";
import styles from "./orderItem.module.css"

function OrderItem(props) {
    return (
        <div className={styles.item}>

            <div className={styles.order}>
                <div className={styles.image}>
                    <img src="/3d-order-image.jpeg" alt=""/>
                </div>
                <div className={styles.content}>
                    <div className={styles.name}>
                        <Link to={`/orders/${props.order._id}`}>{props.order._id}</Link>
                    </div>
                    <div className={styles.objects}>
                        {props.order.objectIds.length} objects
                    </div>
                </div>
            </div>

            <div className={styles.status}>
                {props.order.status}
            </div>

            <div className={styles.price}>
                <i className="fa fa-inr"/>{props.order.price}
            </div>

            <div className={styles.delivered}>
                {deliveredDate(props.order)}
            </div>
        </div>
    );
}

function deliveredDate(order){
    const date = order.deliveredOn
    return date ? new Date(date).toLocaleDateString() : '-'
}

export default OrderItem;