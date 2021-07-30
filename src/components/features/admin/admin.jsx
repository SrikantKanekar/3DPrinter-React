import React, {Component} from 'react';
import {toast} from "react-toastify";
import admin from "../../../services/adminService";
import auth from "../../../services/authService";
import OrderItem from "./orderItem/orderItem";
import Title from "../../util/title/title";
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

    render() {
        const {orders} = this.state

        return (
            <div className="container">
                {orders.length && (
                    <div className="orders_container">
                        {orders.map(order =>
                            <OrderItem
                                key={order.id}
                                order={order}
                                orderStatus={this.orderStatus}
                                updateOrderStatus={this.updateOrderStatus}
                            />
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