import React, {Component} from 'react';
import {Link} from "react-router-dom";
import notification from "../../../../services/notificationService";
import {toast} from "react-toastify";
import Title from "../../../util/title/title";
import styles from "./notifications.module.css"

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
                {notifications.length > 0 && (
                    <div className="row">
                        <div className="col">
                            {notifications.map(notification =>
                                <div key={notification.id}>
                                    <div className={styles.content}>
                                        <div className={styles.title}>
                                            <Link to={`notifications/${notification.id}`}>{notification.subject}</Link>
                                        </div>
                                        <div className={styles.message}>{notification.body}</div>
                                        <div className={styles.date}>
                                            ~{new Date(notification.posted_at).toLocaleString()}
                                        </div>
                                    </div>
                                    <hr className={styles.divider}/>
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