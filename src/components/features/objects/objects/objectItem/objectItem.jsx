import React, {Component} from 'react';
import {Link} from "react-router-dom";
import styles from "./objectItem.module.css"

class ObjectItem extends Component {
    render() {
        const {object} = this.props
        return (
            <div className={styles.object}>

                <div className={styles.image}>
                    <img src={object.imageUrl} alt=""/>
                </div>

                <div className={styles.description}>
                    <div className={styles.title}>
                        <Link to={`/objects/${object.id}`}>{object.name}</Link>
                    </div>

                    <div className={styles.price}>
                        <i className="fa fa-inr"/>{this.getObjectPrice(object)}
                    </div>

                    <div className={object.status.toLowerCase()}>
                        {object.status}
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

export default ObjectItem;