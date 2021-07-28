import React, {Component} from 'react';
import admin from "../../../services/adminService";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import "./admin.css"
import auth from "../../../services/authService";

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
            const orders = [...this.state.orders]
            const index = orders.indexOf(order)
            orders[index].status = data
            this.setState({orders})
        } catch (e) {
            toast.dark(e.message)
        }
    }

    render() {
        const {orders} = this.state
        if (orders.length === 0) return <div className="container">No Orders</div>

        return (
            <div className="container">
                <div className="row">
                    {orders.map(order =>
                        <div className="col-3 product" key={order.id}>
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

                                <div className='btn-group' role='group'>
                                    <div data-status="0" className="button admin placed disabled">
                                        <a href="/">Placed</a>
                                    </div>
                                    <div data-status="1" className="button admin confirmed">
                                        <a href="/">Confirmed</a>
                                    </div>
                                    <div data-status="2" className="button admin processing">
                                        <a href="/">Processing</a>
                                    </div>
                                    <div data-status="3" className="button admin delivering">
                                        <a href="/">Delivering</a>
                                    </div>
                                    <div data-status="4" className="button admin delivered">
                                        <a href="/">Delivered</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Admin;