import React, {Component, Fragment} from 'react';
import {Link} from "react-router-dom";
import order from "../../../../services/orderService";
import auth from "../../../../services/authService";
import admin from "../../../../services/adminService";
import {toast} from "react-toastify";
import NotificationForm from "./notificationForm";
import "./order.css"
import Button from "../../../util/button/button";

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

    isCompleted = (object, statusId) => {
        return statusId <= this.printingStatus.find(it => it.name === object.printingStatus).id
    }

    isNotAllowed = (object, statusId) => {
        return statusId > this.printingStatus.find(it => it.name === object.printingStatus).id + 1
    }

    render() {
        const {order, objects, isAdmin} = this.state

        return (
            <div className="container">
                <div className="objects_container">
                    {objects.map(object =>
                        <div className="product" key={object.id}>
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
                                        <div className='status_buttons'>
                                            {this.printingStatus.map(status =>
                                                <Button
                                                    key={status.id}
                                                    label={status.name}
                                                    errors={this.isNotAllowed(object, status.id)}
                                                    completed={this.isCompleted(object, status.id)}
                                                    onClick={() => this.updatePrintingStatus(status.name, object)}
                                                />
                                            )}
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
                            <NotificationForm email={order.userEmail}/>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    printingStatus = [
        {id: 0, name: "PENDING"},
        {id: 1, name: "PRINTING"},
        {id: 2, name: "PRINTED"}
    ]
}

export default Order;