import React from 'react';
import styles from "./ordersHeader.module.css";

function OrdersHeader() {
    return (
        <div className={`${styles.header} clearfix`}>
            <div className={styles.order}>
                Order
            </div>

            <div className={styles.content}>
                <div>Status</div>
                <div>Price</div>
                <div>Delivered</div>
            </div>
        </div>
    );
}

export default OrdersHeader;