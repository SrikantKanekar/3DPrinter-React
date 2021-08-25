import React, {Component} from 'react';
import requestService from "../../../../../services/requestService";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import Title from "../../../../util/title/title";
import styles from "./objectRequests.module.css"

class ObjectRequests extends Component {
    state = {
        objects: []
    }

    async componentDidMount() {
        try {
            const {data: objects} = await requestService.getAllObjectRequests()
            this.setState({objects})
        } catch (e) {
            toast.dark(e.message)
        }
    }

    render() {
        const {objects} = this.state

        return (
            <div className="container">
                {objects.length > 0 && (
                    <div className={styles.container}>
                        {objects.map(object =>
                            <div className={styles.request} key={object.id}>

                                <div className={styles.image}>
                                    <img src={object.imageUrl} alt=""/>
                                </div>

                                <div className={styles.content}>
                                    <div className={styles.name}>
                                        <Link to={`/admin/objects/${object.userEmail}/${object.id}`}>{object.name}</Link>
                                    </div>

                                    <div>ID : {object.id}</div>
                                    <div>{object.userEmail}</div>
                                    <div>{new Date(object.created_at).toLocaleString()}</div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {!objects.length && (
                    <Title>No Active Objects</Title>
                )}
            </div>
        );
    }
}

export default ObjectRequests;