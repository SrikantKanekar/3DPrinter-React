import React, {Component} from 'react';
import "./title.css"

class Title extends Component {
    render() {
        const titleClass = this.props.center ? 'row title justify-content-center' : 'title'
        return (
            <div className={titleClass}>
                {this.props.children}
            </div>
        );
    }
}

export default Title;