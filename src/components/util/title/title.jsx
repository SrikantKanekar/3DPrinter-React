import React, {Component} from 'react';
import "./title.css"

class Title extends Component {
    render() {
        const titleClass = this.props.center ? 'row section_title justify-content-center' : 'section_title'
        return (
            <div className={titleClass}>
                {this.props.children}
            </div>
        );
    }
}

export default Title;