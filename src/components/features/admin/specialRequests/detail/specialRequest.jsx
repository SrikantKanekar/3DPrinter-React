import React, {Component} from 'react';
import requestService from "../../../../../services/requestService";
import Canvas from "../../../../canvas/canvas";
import SpecialRequestForm from "./specialRequestForm";
import Title from "../../../../util/title/title";
import styles from "./specialRequest.module.css"
import SettingList from "./settingList";

class SpecialRequest extends Component {
    state = {
        request: {}
    }

    async componentDidMount() {
        try {
            const {data: request} = await requestService.getSpecial(this.props.match.params.id)
            this.setState({request})
        } catch (e) {
            if (e.response && e.response.status === 404) {
                this.props.history.replace("/not-found");
            }
        }
    }

    render() {
        const request = this.state.request
        const setting = request.setting

        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        {request.fileUrl && (
                            <Canvas
                                fileUrl={request.fileUrl}
                                fileExt={request.fileExtension}
                                canvasError={e => void 0}
                            />
                        )}
                    </div>
                    <div className="col-lg-6">
                        <div className={styles.content}>
                            <div className={styles.name}>
                                {request._id}
                            </div>
                            <div>
                                File: <a href={request.fileUrl}>download</a>
                            </div>
                            <div>
                                User Email: {request.userEmail}
                            </div>
                            <div>
                                Time: {new Date(request.requestedAt).toLocaleString()}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.settings}>
                    <Title>Settings</Title>
                    {setting && <SettingList setting={setting}/>}
                </div>

                <SpecialRequestForm id={request._id}/>
            </div>
        );
    }
}

export default SpecialRequest;