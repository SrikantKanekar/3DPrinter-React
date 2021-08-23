import React, {Component} from 'react';
import requestService from "../../../../../services/requestService";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import Title from "../../../../util/title/title";
import styles from "./directRequests.module.css"

class DirectRequests extends Component {
    state = {
        requests: []
    }

    async componentDidMount() {
        try {
            const {data: requests} = await requestService.getAllDirect()
            this.setState({requests})
        } catch (e) {
            toast.dark(e.message)
        }
    }

    render() {
        const {requests} = this.state

        return (
            <div className="container">
                {requests.length > 0 && (
                    <div className={styles.container}>
                        {requests.map(request =>
                            <div className={styles.request} key={request._id}>

                                <div className={styles.image}>
                                    <img src={request.imageUrl} alt=""/>
                                </div>

                                <div className={styles.content}>
                                    <div className={styles.name}>
                                        <Link to={`/admin/requests/direct/${request._id}`}>ID : {request._id}</Link>
                                    </div>

                                    <div>{request.userEmail}</div>
                                    <div>{new Date(request.requestedAt).toLocaleString()}</div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {!requests.length && (
                    <Title>No Active Direct Requests</Title>
                )}
            </div>
        );
    }
}

export default DirectRequests;