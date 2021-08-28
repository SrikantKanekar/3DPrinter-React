import React, {Component, Fragment} from 'react';
import cart from "../../../../services/cartService";
import {toast} from "react-toastify";
import Canvas from "../../../canvas/canvas";
import Button from "../../../util/button/button";
import styles from "./object.module.css"
import RequestForm from "./requestForm";
import Title from "../../../util/title/title";
import objectService from "../../../../services/objectService";
import SelectableCard from "../../../util/card/selectableCard";
import ReactTooltip from "react-tooltip";
import SlicingDetail from "../../util/slicingDetail";

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

    toggleMessage = () => {
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
        const sliced = object.slicing.sliced
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

                            {!sliced && (
                                <div className={styles.text}>
                                    Price for your model will be calculated by our team and
                                    you will be notified as soon as it is done
                                </div>
                            )}

                            {sliced && (
                                <Fragment>
                                    <SlicingDetail object={object}/>

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

                {sliced && (
                    <div className={styles.cards}>
                        <ReactTooltip effect="solid"/>

                        <SelectableCard
                            title="Super"
                            description={object.slicing._super.price}
                            selected={quality === "SUPER"}
                            onClick={() => this.handleQualityChange("SUPER")}
                            tooltip="Super Quality"
                        />

                        <SelectableCard
                            title="Dynamic"
                            description={object.slicing.dynamic.price}
                            selected={quality === "DYNAMIC"}
                            onClick={() => this.handleQualityChange("DYNAMIC")}
                            tooltip="Dynamic Quality"
                        />

                        <SelectableCard
                            title="Standard"
                            description={object.slicing.standard.price}
                            selected={quality === "STANDARD"}
                            onClick={() => this.handleQualityChange("STANDARD")}
                            tooltip="Standard Quality"
                        />

                        <SelectableCard
                            title="Low"
                            description={object.slicing.low.price}
                            selected={quality === "LOW"}
                            onClick={() => this.handleQualityChange("LOW")}
                            tooltip="Low Quality"
                        />

                        {object.slicing.custom.price != null && (
                            <SelectableCard
                                title="Custom"
                                description={object.slicing.custom.price}
                                selected={quality === "CUSTOM"}
                                onClick={() => this.handleQualityChange("CUSTOM")}
                                tooltip="Custom Quality"
                            />
                        )}
                    </div>
                )}

                <div className={styles.special_request}>
                    <Button label="Special Request" onClick={this.toggleMessage}/>
                    <div className={`${styles.collapsible} ${this.state.collapsed ? styles.collapsed : ''}`}>
                        <RequestForm
                            object={object}
                            {...this.props}
                        />
                    </div>
                </div>

                <div className={styles.delete_button}>
                    <Title>Delete Object</Title>
                    <div>
                        <Button label="Delete" onClick={this.handleDelete}/>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default ObjectNone;