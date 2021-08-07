import React, {Component} from 'react';
import objectService from "../../../../services/objectService";
import cart from "../../../../services/cartService";
import {toast} from "react-toastify";
import ObjectItem from "./objectItem/objectItem";
import styles from "./objects.module.css"

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

    handleAddToCart = async (e, object) => {
        e.preventDefault()
        try {
            await cart.add(object.id)
            const objects = [...this.state.objects]
            const index = objects.indexOf(object)
            objects[index].status = "CART"
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
                                handleAddToCart={this.handleAddToCart}
                                object={object}/>
                        )}
                    </div>
                )}
            </div>
        );
    }
}

export default Objects;