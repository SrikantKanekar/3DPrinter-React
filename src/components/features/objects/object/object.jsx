import React, {Component, Fragment} from 'react';
import objectService from "../../../../services/objectService";
import ObjectNone from "./objectNone";
import ObjectTracking from "./objectTracking";
import ObjectCompleted from "./objectCompleted";
import SettingForm from "./settingForm";
import Button from "../../../util/button/button";
import {toast} from "react-toastify";
import Title from "../../../util/title/title";
import styles from './object.module.css'

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

                        {status === "NONE" && (
                            <Fragment>
                                <div className={styles.setting}>
                                    <SettingForm
                                        object={object}
                                        updateObject={obj => this.updateObject(obj)}
                                        {...this.props}/>
                                </div>
                                <div className={styles.delete_button}>
                                    <Title>Delete</Title>
                                    <div>
                                        <Button label="Delete" onClick={this.handleDelete}/>
                                    </div>
                                </div>
                            </Fragment>
                        )}
                    </div>
                )}
            </div>
        );
    }

}

export default ObjectGet;