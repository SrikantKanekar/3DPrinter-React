import React, {Component} from 'react';
import objectService from "../../../../services/objectService";
import ObjectNone from "./objectNone";
import ObjectTracking from "./objectTracking";
import ObjectCompleted from "./objectCompleted";
import SettingForm from "./settingForm";
import Button from "../../../util/button/button";
import {toast} from "react-toastify";
import Title from "../../../util/title/title";
import './object.css'

class ObjectGet extends Component {
    state = {}

    async componentDidMount() {
        try {
            const id = this.props.match.params.id
            const {data: object} = await objectService.get(id)
            this.setState({object})
        } catch (e) {
            if (e.response && e.response.status === 404) {
                this.props.history.replace("/not-found");
            }
        }
    }

    updateObject = (object) => {
        this.setState({object})
    }

    handleDelete = async () => {
        try {
            await objectService.deleteObject(this.state.object.id)
            this.props.history.goBack()
        } catch (e) {
            toast.dark(e.message)
        }
    }

    render() {
        const object = this.state.object
        const status = object ? object.status : ''
        return (
            <div className="container">
                {object && (
                    <div>
                        {(status === "NONE" || status === "CART") && (
                            <ObjectNone object={object} updateObject={obj => this.updateObject(obj)}/>
                        )}

                        {status === "TRACKING" && <ObjectTracking object={object}/>}
                        {status === "COMPLETED" && <ObjectCompleted object={object}/>}

                        <div className="setting">
                            <SettingForm
                                object={object}
                                updateObject={obj => this.updateObject(obj)}
                                {...this.props}/>
                        </div>

                        {status === "NONE" && (
                            <div className="delete_button_container">
                                <Title>Delete</Title>
                                <div className="delete_button">
                                    <Button label="Delete" onClick={this.handleDelete}/>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

        );
    }

}

export default ObjectGet;