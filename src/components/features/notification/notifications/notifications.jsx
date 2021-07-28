import React, {Component} from 'react';
import {Link} from "react-router-dom";
import notification from "../../../../services/notificationService";
import "./notifications.css"

class Notifications extends Component {
    state = {
        notifications: []
    }

    async componentDidMount() {
        const {data: notifications} = await notification.getAll()
        this.setState({notifications})
    }

    render() {
        const {notifications} = this.state

        if (notifications.length === 0) return <div className="container">No Notificatons</div>

        return (
            <div className="container">
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
            </div>
        );
    }
}

export default Notifications;