import React, {Component, Fragment} from 'react';
import order from "../../../../services/orderService";
import {toast} from "react-toastify";
import OrdersHeader from "./ordersHeader/ordersHeader";
import OrderItem from "./orderItem/orderItem";
import Title from "../../../util/title/title";

class Orders extends Component {
    state = {
        orders: []
    }

    async componentDidMount() {
        try {
            const {data: orders} = await order.getAll()
            this.setState({orders})
        } catch (e) {
            toast.dark(e.message)
        }
    }

    render() {
        const {orders} = this.state

        return (
            <div className="container">
                {orders.length && (
                    <Fragment>
                        <OrdersHeader/>

                        {orders.map(order =>
                            <OrderItem key={order.id} order={order}/>
                        )}
                    </Fragment>
                )}


                {!orders.length && (
                    <Title>No orders</Title>
                )}
            </div>
        );
    }
}

export default Orders;