import React, {Component} from 'react';
import requestService from "../../../../../services/requestService";
import Canvas from "../../../../canvas/canvas";
import ObjectRequestForm from "./objectRequestForm";
import styles from "./objectRequest.module.css"

class ObjectRequest extends Component {
    state = {
        object: {}
    }

    async componentDidMount() {
        try {
            const {id, email} = this.props.match.params
            const {data: object} = await requestService.getObjectRequest(email, id)
            this.setState({object})
        } catch (e) {
            if (e.response && e.response.status === 404) {
                this.props.history.replace("/not-found");
            }
        }
    }

    render() {
        const object = this.state.object

        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        {object.fileUrl && (
                            <Canvas
                                fileUrl={object.fileUrl}
                                fileExt={object.fileExtension}
                                canvasError={e => void 0}
                            />
                        )}
                    </div>
                    <div className="col-lg-6">
                        <div className={styles.content}>
                            <div className={styles.name}>
                                {object.id}
                            </div>
                            <div>
                                File: <a href={object.fileUrl}>download</a>
                            </div>
                            <div>
                                User Email: {object.userEmail}
                            </div>
                            <div>
                                Time: {new Date(object.created_at).toLocaleString()}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.settings}>
                    <ObjectRequestForm email={object.userEmail} id={object.id}/>
                </div>
            </div>
        );
    }
}

export default ObjectRequest;