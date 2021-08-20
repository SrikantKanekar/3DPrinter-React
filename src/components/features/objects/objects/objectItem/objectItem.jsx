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
                        <i className="fa fa-inr"/>{object.slicing.standard.price}
                    </div>

                    <div className={object.status.toLowerCase()}>
                        {object.status}
                    </div>
                </div>
            </div>
        );
    }
}

export default ObjectItem;