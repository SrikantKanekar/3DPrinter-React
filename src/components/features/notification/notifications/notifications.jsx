import React, {Component} from 'react';
import {Link} from "react-router-dom";
import notification from "../../../../services/notificationService";
import {toast} from "react-toastify";
import Title from "../../../util/title/title";
import "./notifications.css"

class Notifications extends Component {
    state = {
        notifications: []
    }

    async componentDidMount() {
        try{
            const {data: notifications} = await notification.getAll()
            this.setState({notifications})
        }catch (e) {
            toast.dark(e.message)
        }
    }

    render() {
        const {notifications} = this.state

        return (
            <div className="container">
                {notifications.length && (
                    <div className="row">
                        <div className="col">
                            {notifications.map(notification =>
                                <div className="notification" key={notification.id}>
                                    <div className="notification_content">
                                        <div className="notification_title">
                                            <Link to={`notifications/${notification.id}`}>{notification.subject}</Link>
                                        </div>
                                        <div className="notification_message">{notification.body}</div>
                                        <div
                                            className="notification_date">{new Date(notification.posted_at).toLocaleString()}</div>
                                    </div>
                                    <hr className="divider"/>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {!notifications.length && (
                    <Title>No Notifications</Title>
                )}
            </div>
        );
    }
}

export default Notifications;