import React, {Component} from 'react';
import AdminOrderItem from "./orderItem/adminOrderItem";
import Title from "../../../util/title/title";
import admin from "../../../../services/adminService";
import {toast} from "react-toastify";
import styles from "./adminOrders.module.css";

class AdminOrders extends Component {
    state = {
        orders: []
    }

    async componentDidMount() {
        try {
            const {data: orders} = await admin.getAllActiveOrders()
            const length = orders.length
            orders.forEach((order, index) => {
                order.name = `Order ${length - index}`
            })
            this.setState({orders})
        } catch (e) {
            toast.dark(e.message)
        }
    }

    updateOrderStatus = async (status, order) => {
        try {
            const {data} = await admin.updateOrderStatus(status, order._id)
            if (status === 'DELIVERED') {
                const orders = this.state.orders.filter(it => it._id !== order._id)
                this.setState({orders})
            } else {
                const orders = [...this.state.orders]
                const index = orders.indexOf(order)
                orders[index].status = data
                this.setState({orders})
            }
        } catch (e) {
            toast.dark(e.message)
        }
    }

    render() {
        const {orders} = this.state

        return (
            <div className="container">
                {orders.length > 0 && (
                    <div className={styles.container}>
                        {orders.map(order =>
                            <AdminOrderItem
                                key={order._id}
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

export default AdminOrders;