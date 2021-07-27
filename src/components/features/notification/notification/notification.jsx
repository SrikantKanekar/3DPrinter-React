import React, {Component} from 'react';

class Notification extends Component {
    render() {
        return (
            <div>
                Notification : {this.props.match.params.id}
            </div>
        );
    }
}

export default Notification;