import React, {Component, Fragment} from 'react';
import {toast} from "react-toastify";
import order from "../../../../services/orderService";
import auth from "../../../../services/authService";
import admin from "../../../../services/adminService";
import NotificationForm from "./notificationForm";
import OrderObjectItem from "./orderObjectItem/orderObjectItem";
import styles from "./order.module.css"
import Title from "../../../util/title/title";
import Subtitle from "../../../util/subtitle/subtitle";

class Order extends Component {
    state = {
        order: {},
        objects: [],
        isAdmin: false
    }

    async componentDidMount() {
        try {
            const {data} = await order.get(this.props.match.params.id)
            const user = auth.getCurrentUser()
            this.setState({
                order: data.order,
                objects: data.objects,
                isAdmin: user.isAdmin
            })
        } catch (e) {
            if (e.response && e.response.status === 404) {
                this.props.history.replace("/not-found");
            }
        }
    }

    updatePrintingStatus = async (status, object) => {
        try {
            const request = {
                orderId: this.state.order._id,
                objectId: object.id,
                printingStatus: status
            }
            const {data} = await admin.updatePrintingStatus(request)
            const objects = [...this.state.objects]
            const index = objects.indexOf(object)
            objects[index].printingStatus = data
            this.setState({objects})
        } catch (e) {
            if (e.response && e.response.status === 405) {
                toast.dark("Please start processing this order first")
            } else toast.dark(e.message)
        }
    }

    render() {
        const {order, objects, isAdmin} = this.state

        return (
            <Fragment>
                {order.objectIds && (
                    <div className="container">
                        <Title>
                            {order.objectIds.length} Object{order.objectIds.length === 1 ? "" : "s"} in current order
                        </Title>
                        <Subtitle>Status: {order.status}</Subtitle>
                        {isAdmin && <Subtitle>User: {order.userEmail}</Subtitle>}
                        <Subtitle>Price: <i className="fa fa-inr"/>{order.price}</Subtitle>

                        <div className={styles.container}>
                            {objects.map(object =>
                                <OrderObjectItem
                                    object={object}
                                    isAdmin={isAdmin}
                                    printingStatus={this.printingStatus}
                                    updatePrintingStatus={this.updatePrintingStatus}
                                    key={object.id}/>
                            )}
                        </div>

                        {isAdmin && (
                            <div className="row">
                                <div className={`${styles.notification} col-lg-6`}>
                                    <NotificationForm email={order.userEmail}/>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </Fragment>
        );
    }

    printingStatus = [
        {id: 0, name: "PENDING"},
        {id: 1, name: "PRINTING"},
        {id: 2, name: "PRINTED"}
    ]
}

export default Order;