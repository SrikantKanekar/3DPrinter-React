import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Button from "../../../util/button/button";
import "./orderItem.css"

class OrderItem extends Component {

    isCompleted = (order, statusId) => {
        return statusId <= this.props.orderStatus.find(it => it.name === order.status).id
    }

    isNotAllowed = (order, statusId) => {
        return statusId > this.props.orderStatus.find(it => it.name === order.status).id + 1
    }

    render() {
        const {order} = this.props

        return (
            <div className="order" key={order.id}>
                <div className="order_image">
                    <img src="/3d-order-image.jpeg" alt=""/>
                </div>

                <div className="order_content">
                    <div className="order_id">
                        <Link to={`/orders/${order.id}`}>ID : {order.id}</Link>
                    </div>

                    <div>{order.userEmail}</div>
                    <div><i className="fa fa-inr"/>{order.price}</div>
                    <div>{order.objectIds.length} objects</div>
                    <div className={order.status.toLowerCase()}>
                        {order.status}
                    </div>

                    <div className='order_status_buttons'>
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

export default OrderItem;