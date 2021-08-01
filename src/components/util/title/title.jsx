import React, {Component} from 'react';
import styles from "./title.module.css"

class Title extends Component {
    render() {
        const isCentered = this.props.center ? 'row justify-content-center' : ''

        return (
            <div className={`${styles.title} ${isCentered}`}>
                {this.props.children}
            </div>
        );
    }
}

export default Title;