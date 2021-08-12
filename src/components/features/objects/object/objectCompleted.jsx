import React, {Component} from 'react';
import Canvas from "../../../canvas/canvas";
import styles from "./object.module.css"

class ObjectCompleted extends Component {
    render() {
        const {object} = this.props
        const startedAt = object.trackingDetails.started_at
        const completedAt = object.trackingDetails.completed_at
        const duration = this.calculateDuration(startedAt, completedAt)

        return (
            <div className="row">
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
                        <div>Price: <i className="fa fa-inr"/>{object.slicingDetails.price}</div>
                        <div>Printing status : {object.printingStatus}</div>
                        <div>
                            Completed on : {new Date(completedAt).toLocaleString()}
                        </div>
                        <div>
                            Printing duration : {duration}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    calculateDuration(started, completed) {
        const duration =  Math.abs(new Date(completed) - new Date(started))
        let minutes = Math.floor((duration / (1000 * 60)) % 60);
        let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        return hours + ":" + minutes + " hrs";
    }
}

export default ObjectCompleted;