import React, {Component} from 'react';
import "./spinner.css"

class Spinner extends Component {
    render() {
        return (
            <div className="spinner_container">
                <span className="spinner"/>
            </div>
        );
    }
}

export default Spinner;