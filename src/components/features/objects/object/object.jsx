import React, {Component} from 'react';
import objectService from "../../../../services/objectService";
import ObjectNone from "./objectNone";
import ObjectTracking from "./objectTracking";
import ObjectCompleted from "./objectCompleted";

class ObjectGet extends Component {
    state = {}

    async componentDidMount() {
        try {
            const id = this.props.match.params.id
            const {data: object} = await objectService.get(id)
            this.setState({object})
        } catch (e) {
            if (e.response && e.response.status === 404) {
                this.props.history.replace("/not-found");
            }
        }
    }

    updateObject = (object) => {
        this.setState({object})
    }

    render() {
        const object = this.state.object
        const status = object ? object.status : ''
        return (
            <div className="container">
                {object && (
                    <div>
                        {(status === "NONE" || status === "CART") && (
                            <ObjectNone {...this.props} object={object} updateObject={obj => this.updateObject(obj)}/>
                        )}

                        {status === "TRACKING" && <ObjectTracking object={object}/>}
                        {status === "COMPLETED" && <ObjectCompleted object={object}/>}
                    </div>
                )}
            </div>
        );
    }

}

export default ObjectGet;