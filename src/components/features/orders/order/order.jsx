import React, {Component, Fragment} from 'react';
import "./order.css"
import order from "../../../../services/orderService";
import auth from "../../../../services/authService";
import {Link} from "react-router-dom";
import NotificationForm from "./notificationForm";
import admin from "../../../../services/adminService";
import {toast} from "react-toastify";

class Order extends Component {
    state = {
        order: {},
        objects: [],
        isAdmin: false
    }

    async componentDidMount() {
        const {data} = await order.get(this.props.match.params.id)
        const user = auth.getCurrentUser()

        this.setState({
            order: data.order,
            objects: data.objects,
            isAdmin: user.isAdmin
        })
    }

    handleStatusUpdate = async (object, status) => {
        try {
            const request = {
                orderId: this.state.order.id,
                objectId: object.id,
                printingStatus: status
            }
            const {data} = await admin.updatePrintingStatus(request)
            const objects = [...this.state.objects]
            const index = objects.indexOf(object)
            objects[index].printingStatus = data
            this.setState({objects})
        } catch (e) {
            toast.dark(e.message)
        }
    }

    handleNotificationSubmit = async (data) => {
        const notification = {
            email: this.state.order.userEmail,
            subject: data.subject,
            body: data.body
        }
        await admin.sendNotification(notification)
    }

    render() {
        const {objects, isAdmin} = this.state

        return (
            <div className="container">
                <div className="row">
                    {objects.map(object =>
                        <div className="col-3 product" key={object.id}>
                            <div className="product_image">
                                <img src={object.imageUrl} alt=""/>
                            </div>

                            <div className="product_content">
                                <div className="product_title">
                                    <Link to={`/objects/${object.id}`}>{object.name}</Link>
                                </div>

                                <div className="product_status">{object.printingStatus}</div>

                                {isAdmin && (
                                    <Fragment>
                                        <div className="product_id">ID : {object.id}</div>
                                        <div className='btn-group' role='group'>
                                            <div data-status="0" className="button admin pending disabled">
                                                <a href="/">Pending</a>
                                            </div>
                                            <div data-status="1" className="button admin printing">
                                                <a href="/">Printing</a>
                                            </div>
                                            <div data-status="2" className="button admin printed">
                                                <a href="/">Printed</a>
                                            </div>
                                        </div>
                                    </Fragment>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {isAdmin && (
                    <div className="row">
                        <div className="message_section col-lg-6">
                            <NotificationForm onSubmit={data => this.handleNotificationSubmit(data)}/>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default Order;