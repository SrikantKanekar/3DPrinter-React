import React, {Component, Fragment} from 'react';
import objectService from "../../../../services/objectService";
import cart from "../../../../services/cartService";
import {toast} from "react-toastify";
import Canvas from "../../../canvas/canvas";
import Button from "../../../util/button/button";
import styles from "./object.module.css"
import {CuraWASM} from "cura-wasm";
import {resolveDefinition} from "cura-wasm-definitions";
import ProgressBar from "../../../util/progressBar/progressBar";

class ObjectNone extends Component {
    state = {
        progress: 0,
        slicing: false
    }

    handleCanvasError = (e) => {
        this.setState({canvasError: e})
    }

    handleSlicing = async () => {
        try {
            this.setState({slicing: true})

            const slicer = new CuraWASM({
                //command: 'slice -j definitions/printer.def.json -o Model.gcode -s mesh_position_x=-10 -l Model.stl',
                definition: resolveDefinition('ultimaker2'),
                overrides: [
                    {
                        scope: 'e0',
                        key: 'mesh_position_x',
                        value: -10
                    }
                ],
                transfer: true,
                verbose: true
            });

            const {data: stl} = await objectService.downloadFile(this.props.object.fileUrl)

            slicer.on('progress', percent => {
                this.setState({progress: percent})
            });

            const {gcode, metadata} = await slicer.slice(stl, 'stl');

            const printTime = `${Math.floor(metadata.printTime / 3600)}h ${Math.floor(metadata.printTime % 3600 / 60)}m ${Math.floor(metadata.printTime % 3600 % 60)}s`;
            const materialWeight = metadata.material1Usage
            const materialCost = metadata.material1Usage * 1.5
            const powerCost = metadata.printTime / 3600 * 30
            const labourCost = metadata.printTime / 3600 * 20
            const price = Math.round(materialCost + powerCost + labourCost)

            const slicingDetails = {
                printTime,
                materialWeight,
                materialCost,
                powerCost,
                labourCost,
                price
            }

            console.log(new TextDecoder().decode(new Uint8Array(gcode)))
            console.log(metadata)

            await slicer.destroy()

            const {data} = await objectService.slice(this.props.object.id, slicingDetails)
            const object = {...this.props.object}
            object.slicingDetails = data
            object.setting.updated = false
            this.props.updateObject(object)

            this.setState({progress: 0,slicing: false})
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
        const updated = object.setting.updated
        const status = object.status
        const progress = this.state.progress
        const slicing = this.state.slicing

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
                    <div className={styles.content}>
                        <div className={styles.name}>
                            {object.name}
                        </div>

                        {updated && !slicing && (
                            <div>
                                Slicing details are not upto date
                            </div>
                        )}

                        {slicing && (
                            <Fragment>
                                <div className={styles.slicing}>Slicing...</div>
                                <ProgressBar progress={progress}/>
                            </Fragment>
                        )}

                        {!updated && (
                            <Fragment>
                                <div>
                                    Time: {object.slicingDetails.printTime}
                                </div>
                                <div>
                                    Material Weight: {object.slicingDetails.materialWeight}g
                                </div>
                                <div>
                                    Material Cost: <i className="fa fa-inr"/>{object.slicingDetails.materialCost}
                                </div>
                                <div>
                                    Power Cost: <i className="fa fa-inr"/>{object.slicingDetails.powerCost}
                                </div>
                                <div>
                                    Labour Cost: <i className="fa fa-inr"/>{object.slicingDetails.labourCost}
                                </div>
                                <div>
                                    Total Price: <i className="fa fa-inr"/>{object.slicingDetails.price}
                                </div>
                            </Fragment>
                        )}

                        <div className={styles.button_container}>
                            {updated && !slicing && (
                                <Button label="Slice" onClick={this.handleSlicing}/>
                            )}
                            {!updated && status !== "CART" && (
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
}

export default ObjectNone;