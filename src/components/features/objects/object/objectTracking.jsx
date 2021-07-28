import React, {Component} from 'react';
import Canvas from "../../../canvas/canvas";

class ObjectTracking extends Component {
    render() {
        const {object} = this.props
        const date = object.trackingDetails.started_at
        const startedAt = date ? new Date(date).toLocaleDateString() : ''

        return (
            <div className="row status_tracking">
                <div className="col-12">
                    <video className="video_container" controls>
                        <source src="" type="video/mp4"/>
                        Your browser does not support the video tag.
                    </video>
                </div>

                <div className="col-lg-6">
                    <Canvas
                        fileUrl={object.fileUrl}
                        fileExt={object.fileExtension}
                        canvasError={() => {}}
                    />
                </div>

                <div className="col-lg-6">
                    <div className="object_content">
                        <div className="object_name">{object.name}</div>
                        <div className="object_description">
                            <div className=""><i className="fa fa-inr"/>{object.slicingDetails.totalPrice}</div>
                            <div className="">Printing status : {object.printingStatus}</div>
                            <div className="started_at">Started at : {startedAt}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ObjectTracking;