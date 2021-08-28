import React, {Component, Fragment} from 'react';

class SlicingDetail extends Component {
    render() {
        const details = this.getSlicingDetails(this.props.object)
        return (
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

export default SlicingDetail;