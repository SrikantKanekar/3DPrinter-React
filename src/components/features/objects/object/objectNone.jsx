import React, {Component, Fragment} from 'react';
import cart from "../../../../services/cartService";
import {toast} from "react-toastify";
import Canvas from "../../../canvas/canvas";
import Button from "../../../util/button/button";
import styles from "./object.module.css"
import SettingForm from "./setting/settingForm";
import Title from "../../../util/title/title";
import objectService from "../../../../services/objectService";
import SelectableCard from "../../../util/card/selectableCard";

class ObjectNone extends Component {
    state = {
        collapsed: false
    }

    handleAddToCart = async () => {
        try {
            await cart.add(this.props.object.id)
            const object = {...this.props.object}
            object.status = "CART"
            this.props.updateObject(object)
        } catch (e) {
            toast.dark(e.message)
        }
    }

    handleRemoveFromCart = async () => {
        try {
            await cart.remove(this.props.object.id)
            const object = {...this.props.object}
            object.status = "NONE"
            this.props.updateObject(object)
        } catch (e) {
            toast.dark(e.message)
        }
    }

    handleQualityChange = async (quality) => {
        try {
            const {data} = await objectService.updateQuality(this.props.object.id, quality)
            const object = {...this.props.object}
            object.quality = data
            this.props.updateObject(object)
        } catch (e) {
            toast.dark(e.message)
        }
    }

    toggleAdvancedSettings = () => {
        this.setState({collapsed: !this.state.collapsed})
    }

    handleDelete = async () => {
        try {
            await objectService.deleteObject(this.props.object.id)
            this.props.history.goBack()
        } catch (e) {
            toast.dark(e.message)
        }
    }

    render() {
        const {object} = this.props
        const status = object.status
        const details = this.getSlicingDetails(object)
        const quality = object.quality

        return (
            <Fragment>
                <div className="row">
                    <div className="col-lg-6">
                        <Canvas
                            fileUrl={object.fileUrl}
                            fileExt={object.fileExtension}
                            canvasError={e => void 0}
                        />
                    </div>
                    <div className="col-lg-6">
                        <div className={styles.content}>
                            <div className={styles.name}>
                                {object.name}
                            </div>

                            {details === false && (
                                <div className={styles.text}>
                                    Price for your model will be calculated by our team and
                                    you will be notified as soon as it is done
                                </div>
                            )}

                            {details !== false && (
                                <Fragment>
                                    <div>
                                        Time: {details.printTime}
                                    </div>
                                    <div>
                                        Material Weight: {details.materialWeight}g
                                    </div>
                                    <div>
                                        Filament length: {details.filament}m
                                    </div>
                                    <div>
                                        Material Cost: <i className="fa fa-inr"/>{details.materialCost}
                                    </div>
                                    <div>
                                        Power Cost: <i className="fa fa-inr"/>{details.powerCost}
                                    </div>
                                    <div>
                                        Labour Cost: <i className="fa fa-inr"/>{details.labourCost}
                                    </div>
                                    <div>
                                        Total Price: <i className="fa fa-inr"/>{details.price}
                                    </div>

                                    <div className={styles.button_container}>
                                        {status !== "CART" && (
                                            <Button label="Add to cart" onClick={this.handleAddToCart}/>
                                        )}
                                        {status === "CART" && (
                                            <Button label="Remove from cart" onClick={this.handleRemoveFromCart}/>
                                        )}
                                    </div>
                                </Fragment>
                            )}
                        </div>
                    </div>
                </div>

                {details !== false && (
                    <div className={styles.cards}>
                        <SelectableCard
                            title="Super"
                            description={object.slicing._super.price}
                            selected={quality === "SUPER"}
                            onClick={() => this.handleQualityChange("SUPER")}/>

                        <SelectableCard
                            title="Dynamic"
                            description={object.slicing.dynamic.price}
                            selected={quality === "DYNAMIC"}
                            onClick={() => this.handleQualityChange("DYNAMIC")}/>

                        <SelectableCard
                            title="Standard"
                            description={object.slicing.standard.price}
                            selected={quality === "STANDARD"}
                            onClick={() => this.handleQualityChange("STANDARD")}/>

                        <SelectableCard
                            title="Low"
                            description={object.slicing.low.price}
                            selected={quality === "LOW"}
                            onClick={() => this.handleQualityChange("LOW")}/>

                        {object.slicing.custom.price != null && (
                            <SelectableCard
                                title="Custom"
                                description={object.slicing.custom.price}
                                selected={quality === "CUSTOM"}
                                onClick={() => this.handleQualityChange("CUSTOM")}/>
                        )}
                    </div>
                )}

                <div className={styles.setting}>
                    <Button label="Advanced Settings" onClick={this.toggleAdvancedSettings}/>
                    <div className={`${styles.collapsible} ${this.state.collapsed ? styles.collapsed : ''}`}>
                        <SettingForm
                            object={object}
                            updateObject={obj => this.props.updateObject(obj)}
                            {...this.props}/>
                    </div>
                </div>

                <div className={styles.delete_button}>
                    <Title>Delete</Title>
                    <div>
                        <Button label="Delete" onClick={this.handleDelete}/>
                    </div>
                </div>
            </Fragment>
        );
    }

    getSlicingDetails = (object) => {
        const quality = object.quality
        if (!object.slicing.sliced) return false

        if (quality === "SUPER") return object.slicing._super
        else if (quality === "DYNAMIC") return object.slicing.dynamic
        else if (quality === "STANDARD") return object.slicing.standard
        else if (quality === "LOW") return object.slicing.low
        else if (quality === "CUSTOM") return object.slicing.custom
    }
}

export default ObjectNone;