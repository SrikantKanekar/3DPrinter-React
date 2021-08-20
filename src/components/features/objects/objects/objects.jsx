import React, {Component} from 'react';
import objectService from "../../../../services/objectService";
import {toast} from "react-toastify";
import ObjectItem from "./objectItem/objectItem";
import styles from "./objects.module.css"
import Title from "../../../util/title/title";

class Objects extends Component {
    state = {
        objects: []
    }

    async componentDidMount() {
        try {
            const {data: objects} = await objectService.getAll()
            this.setState({objects})
        } catch (e) {
            toast.dark(e.message)
        }
    }

    render() {
        const objects = this.state.objects
        const {length: count} = objects

        return (
            <div className="container">
                {count > 0 && (
                    <div className={styles.container}>
                        {objects.map(object =>
                            <ObjectItem
                                key={object.id}
                                object={object}/>
                        )}
                    </div>
                )}

                {!count && (
                    <Title>No objects</Title>
                )}
            </div>
        );
    }
}

export default Objects;