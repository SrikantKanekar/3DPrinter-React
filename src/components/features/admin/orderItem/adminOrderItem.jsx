import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Button from "../../../util/button/button";
import styles from "./adminOrderItem.module.css"

class AdminOrderItem extends Component {

    isCompleted = (order, statusId) => {
        return statusId <= this.props.orderStatus.find(it => it.name === order.status).id
    }

    isNotAllowed = (order, statusId) => {
        return statusId > this.props.orderStatus.find(it => it.name === order.status).id + 1
    }

    render() {
        const {order} = this.props

        return (
            <div className={styles.order}>
                <div className={styles.image}>
                    <img src="/3d-order-image.jpeg" alt=""/>
                </div>

                <div className={styles.content}>
                    <div className={styles.name}>
                        <Link to={`/orders/${order._id}`}>ID : {order._id}</Link>
                    </div>

                    <div>{order.userEmail}</div>
                    <div className={order.status.toLowerCase()}>
                        {order.status}
                    </div>
                    <div>{order.objectIds.length} objects</div>
                    <div><i className="fa fa-inr"/>{order.price}</div>

                    <div className={styles.buttons}>
                        {this.props.orderStatus.map(status =>
                            <Button
                                key={status.id}
                                label={status.name}
                                errors={this.isNotAllowed(order, status.id)}
                                completed={this.isCompleted(order, status.id)}
                                onClick={() => this.props.updateOrderStatus(status.name, order)}
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminOrderItem;