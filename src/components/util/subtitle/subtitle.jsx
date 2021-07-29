import React, {Component} from 'react';
import "./subtitle.css"

class Subtitle extends Component {
    render() {
        return (
            <div className="subtitle">
                {this.props.children}
            </div>
        );
    }
}

export default Subtitle;