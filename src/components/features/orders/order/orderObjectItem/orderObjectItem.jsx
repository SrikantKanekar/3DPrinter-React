import React, {Component, Fragment} from 'react';
import {Link} from "react-router-dom";
import Button from "../../../../util/button/button";
import "./orderObjectItem.css"

class OrderObjectItem extends Component {

    isCompleted = (object, statusId) => {
        return statusId <= this.props.printingStatus.find(it => it.name === object.printingStatus).id
    }

    isNotAllowed = (object, statusId) => {
        return statusId > this.props.printingStatus.find(it => it.name === object.printingStatus).id + 1
    }

    render() {
        const {object, isAdmin, printingStatus} = this.props

        return (
            <div className="order_object" key={object.id}>
                <div className="order_object_image">
                    <img src={object.imageUrl} alt=""/>
                </div>

                <div className="order_object_content">
                    <div className="order_object_title">
                        <Link to={`/objects/${object.id}`}>{object.name}</Link>
                    </div>

                    <div className={object.printingStatus.toLowerCase()}>
                        {object.printingStatus}
                    </div>

                    {isAdmin && (
                        <Fragment>
                            <div>ID : {object.id}</div>
                            <div className='object_status_buttons'>
                                {printingStatus.map(status =>
                                    <Button
                                        key={status.id}
                                        label={status.name}
                                        errors={this.isNotAllowed(object, status.id)}
                                        completed={this.isCompleted(object, status.id)}
                                        onClick={() => this.props.updatePrintingStatus(status.name, object)}
                                    />
                                )}
                            </div>
                        </Fragment>
                    )}
                </div>
            </div>
        );
    }
}

export default OrderObjectItem;