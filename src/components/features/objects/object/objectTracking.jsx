import React, {Component} from 'react';
import Canvas from "../../../canvas/canvas";
import styles from "./object.module.css"

class ObjectTracking extends Component {
    render() {
        const {object} = this.props
        const startTime = object.trackingDetails.started_at
        const startedAt = startTime ? new Date(startTime).toLocaleString() : ''

        const stopTime = object.trackingDetails.completed_at
        const stoppedAt = stopTime ? new Date(stopTime).toLocaleString() : ''

        return (
            <div className="row justify-content-center">
                {startedAt && (
                    <div className="col-lg-10">
                        <video className={styles.video_container} controls>
                            <source src="" type="video/mp4"/>
                            Your browser does not support the video tag.
                        </video>
                    </div>
                )}

                <div className="col-lg-6">
                    <Canvas
                        fileUrl={object.fileUrl}
                        fileExt={object.fileExtension}
                        canvasError={() => {
                        }}
                    />
                </div>

                <div className="col-lg-6">
                    <div className={styles.content}>
                        <div className={styles.name}>
                            {object.name}
                        </div>
                        <div>Price: <i className="fa fa-inr"/>{this.getObjectPrice(object)}</div>
                        <div>Printing status : {object.printingStatus}</div>

                        {!startedAt && (
                            <div>Printing will start soon</div>
                        )}
                        {startedAt && (
                            <div>Started at : {startedAt}</div>
                        )}
                        {stoppedAt && (
                            <div>Completed at : {stoppedAt}</div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    getObjectPrice = (object) => {
        const quality = object.quality
        if (quality === "SUPER") return object.slicing._super.price
        else if (quality === "DYNAMIC") return object.slicing.dynamic.price
        else if (quality === "STANDARD") return object.slicing.standard.price
        else if (quality === "LOW") return object.slicing.low.price
        else if (quality === "CUSTOM") return object.slicing.custom.price
    }
}

export default ObjectTracking;