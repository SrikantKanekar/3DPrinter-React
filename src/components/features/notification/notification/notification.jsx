import React, {Component} from 'react';
import "./notification.css"
import notification from "../../../../services/notificationService";

class Notification extends Component {
    state = {
        notification: ''
    }

    async componentDidMount() {
        try {
            const {data} = await notification.get(this.props.match.params.id)
            this.setState({notification: data})
        } catch (ex) {
            if (ex.response && ex.response.status === 404){
                this.props.history.replace("/not-found");
            }
        }
    }

    render() {
        const {notification} = this.state

        if (!notification) return <div/>

        const date = new Date(notification.posted_at).toLocaleString()

        return (
            <div className="container">
                <div className="notification_detail_content">
                    <div className="notification_detail_title">
                        {notification.subject}
                    </div>
                    <div className="notification_detail_message">{notification.body}</div>
                    <div className="notification_detail_date">{date}</div>
                </div>
            </div>
        );
    }
}

export default Notification;