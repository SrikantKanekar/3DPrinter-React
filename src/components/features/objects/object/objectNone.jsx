import React, {Component, Fragment} from 'react';
import objectService from "../../../../services/objectService";
import cart from "../../../../services/cartService";
import {toast} from "react-toastify";
import Canvas from "../../../canvas/canvas";
import Button from "../../../util/button/button";

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
        const {object} = this.props
        const slicingDone = object.slicingDetails.uptoDate
        const status = object.status
        const time = this.millisToTime(object.slicingDetails.time)

        return (
            <div className="row">
                <div className="col-lg-6">
                    <Canvas
                        fileUrl={object.fileUrl}
                        fileExt={object.fileExtension}
                        canvasError={e => this.handleCanvasError(e)}
                    />
                </div>

                <div className="col-lg-6">
                    <div className="object_content">
                        <div className="object_name">
                            {object.name}
                        </div>

                        {!slicingDone && (
                            <div>
                                Slicing details are not upto date
                            </div>
                        )}

                        {slicingDone && (
                            <Fragment>
                                <div>
                                    Time: {time}
                                </div>
                                <div>
                                    Material Weight: {object.slicingDetails.materialWeight}g
                                </div>
                                <div>
                                    Material Cost: <i className="fa fa-inr"/>{object.slicingDetails.materialCost}
                                </div>
                                <div>
                                    Electricity Cost: <i className="fa fa-inr"/>{object.slicingDetails.electricityCost}
                                </div>
                                <div>
                                    Total Price: <i className="fa fa-inr"/>{object.slicingDetails.totalPrice}
                                </div>
                            </Fragment>
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