import React, {Component} from 'react';
import cart from "../../../../services/cartService";
import {toast} from "react-toastify";
import Canvas from "../../../canvas/canvas";
import Button from "../../../util/button/button";
import styles from "./object.module.css"

class ObjectNone extends Component {

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

    render() {
        const {object} = this.props
        const status = object.status
        const details = this.getSlicingDetails(object)

        return (
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
                    </div>
                </div>
            </div>
        );
    }

    getSlicingDetails = (object) => {
        const quality = object.setting.quality
        if (quality === "SUPER") return object.slicing._super
        else if (quality === "DYNAMIC") return object.slicing.dynamic
        else if (quality === "STANDARD") return object.slicing.standard
        else if (quality === "LOW") return object.slicing.low
        else if (quality === "CUSTOM") return object.slicing.custom
    }
}

export default ObjectNone;