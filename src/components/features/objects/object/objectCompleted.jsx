import React, {Component} from 'react';
import Canvas from "../../../canvas/canvas";

class ObjectCompleted extends Component {
    render() {
        const {object} = this.props

        return (
            <div className="row status_completed">

                <div className="col-lg-6">
                    <Canvas
                        fileUrl={object.fileUrl}
                        fileExt={object.fileExtension}
                    />
                </div>

                <div className="col-lg-6">
                    <div className="object_content">
                        <div className="object_name">{object.name}</div>
                        <div className="object_description">
                            <div className=""><i className="fa fa-inr"/>{object.slicingDetails.totalPrice}</div>
                            <div className="">Printing status : {object.printingStatus}</div>
                            <div className="completed_at">
                                Completed on : <span>{new Date(object.trackingDetails.completed_at).toLocaleString()}</span>
                            </div>
                            <div className="duration">
                                Printing duration : <span>{new Date(object.trackingDetails.started_at).toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ObjectCompleted;