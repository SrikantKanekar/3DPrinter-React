import React, {Component} from 'react';
import admin from "../../../services/adminService";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import auth from "../../../services/authService";
import Title from "../../util/title/title";
import Button from "../../util/button/button";
import "./admin.css"

class Admin extends Component {

    constructor(props) {
        super(props);
        const user = auth.getCurrentUser()
        if (!user.isAdmin) this.props.history.replace("/not-found");

        this.state = {
            orders: [],
            isAdmin: user.isAdmin
        }
    }

    async componentDidMount() {
        try {
            if (this.state.isAdmin) {
                const {data: orders} = await admin.getAllActiveOrders()
                this.setState({orders})
            }
        } catch (e) {
            toast.dark(e.message)
        }
    }

    updateOrderStatus = async (status, order) => {
        try {
            const {data} = await admin.updateOrderStatus(status, order.id)
            if (status === 'DELIVERED'){
                const orders = this.state.orders.filter(it => it.id !== order.id)
                this.setState({orders})
            } else {
                const orders = [...this.state.orders]
                const index = orders.indexOf(order)
                orders[index].status = data
                this.setState({orders})
            }
        } catch (e) {
            if (e.response && e.response.status === 405) {
                toast.dark("Please prints all objects of the order")
            } else {
                toast.dark(e.message)
            }
        }
    }

    isCompleted = (order, statusId) => {
        return statusId <= this.orderStatus.find(it => it.name === order.status).id
    }

    isNotAllowed = (order, statusId) => {
        return statusId > this.orderStatus.find(it => it.name === order.status).id + 1
    }

    render() {
        const {orders} = this.state

        return (
            <div className="container">
                {orders.length && (
                    <div className="orders_container">
                        {orders.map(order =>
                            <div className="product" key={order.id}>
                                <div className="product_image">
                                    <img src="/3d-order-image.jpeg" alt=""/>
                                </div>

                                <div className="product_content">
                                    <div className="product_id">
                                        <Link to={`/orders/${order.id}`}>ID : {order.id}</Link>
                                    </div>

                                    <div className="product_details">
                                        <div className="product_details_content user_email">{order.userEmail}</div>
                                        <div className="product_details_content price">
                                            <i className="fa fa-inr"/><span>{order.price}</span>
                                        </div>
                                    </div>

                                    <div className="product_details">
                                        <div className="product_details_content status">{order.status}</div>
                                        <div className="product_details_content size">
                                            <span>{order.objectIds.length}</span> objects
                                        </div>
                                    </div>

                                    <div className='status_buttons'>
                                        {this.orderStatus.map(status =>
                                            <Button
                                                key={status.id}
                                                label={status.name}
                                                errors={this.isNotAllowed(order, status.id)}
                                                completed={this.isCompleted(order, status.id)}
                                                onClick={() => this.updateOrderStatus(status.name, order)}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {!orders.length && (
                    <Title>No Active Orders</Title>
                )}
            </div>
        );
    }

    orderStatus = [
        {id: 0, name: "PLACED"},
        {id: 1, name: "CONFIRMED"},
        {id: 2, name: "PROCESSING"},
        {id: 3, name: "DELIVERING"},
        {id: 4, name: "DELIVERED"}
    ]
}

export default Admin;