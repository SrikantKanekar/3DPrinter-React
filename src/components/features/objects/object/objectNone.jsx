import React, {Component} from 'react';
import Canvas from "../../../canvas/canvas";
import Button from "../../../util/button/button";
import objectService from "../../../../services/objectService";
import {toast} from "react-toastify";
import cart from "../../../../services/cartService";

class ObjectNone extends Component {
    state = {
        time: 0
    }

    handleCanvasError = (e) => {
        this.setState({canvasError: e})
    }

    handleSlicing = async () => {
        try {
            const {data: slicingDetails} = await objectService.slice(this.props.object.id)
            const object = {...this.props.object}
            object.slicingDetails = slicingDetails
            this.props.updateObject(object)
        } catch (e) {
            toast.dark(e.message)
        }
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

    render() {
        const object = this.props.object
        const slicingDone = this.props.object.slicingDetails.uptoDate
        const status = this.props.object.status

        return (

            <div className="row status_none">
                <div className="col-lg-6">
                    <Canvas
                        fileUrl={object.fileUrl}
                        fileExt={object.fileExtension}
                        canvasError={e => this.handleCanvasError(e)}
                    />
                </div>

                <div className="col-lg-6">
                    <div className="object_content">

                        <div className="object_name">{object.name}</div>

                        {!slicingDone && (
                            <div className="slicing_pending_text">
                                Slicing details are not upto date
                            </div>
                        )}

                        {slicingDone && (
                            <div className="slicing_details">
                                <div className="time">
                                    Time: {object.slicingDetails.time}
                                </div>
                                <div className="material_weight">
                                    Material Weight {object.slicingDetails.materialWeight} g
                                </div>
                                <div className="material_cost">
                                    Material Cost <i className="fa fa-inr"/> {object.slicingDetails.materialCost}
                                </div>
                                <div className="electricity_cost">
                                    Electricity Cost <i className="fa fa-inr"/> {object.slicingDetails.electricityCost}
                                </div>
                                <div className="total_price">
                                    Total Price <i className="fa fa-inr"/> {object.slicingDetails.totalPrice}
                                </div>
                            </div>
                        )}

                        <div className="button_container">
                            {!slicingDone && (
                                <Button label="Slice" onClick={this.handleSlicing}/>
                            )}
                            {slicingDone && status !== "CART" && (
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

    millisToTime(duration) {
        let minutes = Math.floor((duration / (1000 * 60)) % 60);
        let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        return hours + ":" + minutes + " hrs";
    }
}

export default ObjectNone;