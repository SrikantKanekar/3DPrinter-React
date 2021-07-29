import React, {Component} from 'react';
import objectService from "../../../../services/objectService";
import ObjectNone from "./objectNone";
import ObjectTracking from "./objectTracking";
import ObjectCompleted from "./objectCompleted";
import SettingForm from "./settingForm";
import Button from "../../../util/button/button";
import './object.css'
import {toast} from "react-toastify";

class ObjectGet extends Component {
    state = {}

    async componentDidMount() {
        const id = this.props.match.params.id
        try {
            const {data} = await objectService.get(id)
            this.setState({object: data})
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
        }catch (e){
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

                        <div className="row setting">
                            <div className="col">
                                <SettingForm object={object} {...this.props}/>
                            </div>
                        </div>

                        {status === "NONE" && (
                            <div className="delete_button_container">
                                <div className="section_title">Delete</div>
                                <Button label="Delete" onClick={this.handleDelete}/>
                            </div>
                        )}
                    </div>
                )}
            </div>

        );
    }

}

export default ObjectGet;