import React, {Component} from 'react';
import objectService from "../../../services/objectService";
import {toast} from "react-toastify";
import cart from "../../../services/cartService";
import Title from "../../util/title/title";
import CartHeader from "./cartHeader/cartHeader";
import CartObject from "./cartObject/cartObject";
import CartTotal from "./cartTotal/cartTotal";
import CouponForm from "./couponForm/couponForm";
import style from "./cart.module.css"

class Cart extends Component {
    state = {
        objects: []
    }

    async componentDidMount() {
        try {
            const {data: objects} = await cart.get()
            this.setState({objects})
        } catch (e) {
            toast.dark(e.message)
        }
    }

    handleCartRemove = async (e, object) => {
        e.preventDefault()
        try {
            await cart.remove(object.id)
            const objects = this.state.objects.filter(m => m.id !== object.id)
            this.setState({objects})
        } catch (e) {
            toast.dark(e.message)
        }
    }

    handleQuantityIncrease = async (object) => {
        const quantity = {quantity: object.quantity + 1}
        const {data} = await objectService.updateQuantity(object.id, quantity)
        const objects = [...this.state.objects]
        const index = objects.indexOf(object)
        objects[index].quantity = data
        this.setState({objects})
    }

    handleQuantityDecrease = async (object) => {
        if (object.quantity > 1) {
            const quantity = {quantity: object.quantity - 1}
            const {data} = await objectService.updateQuantity(object.id, quantity)
            const objects = [...this.state.objects]
            const index = objects.indexOf(object)
            objects[index].quantity = data
            this.setState({objects})
        }
    }

    render() {
        const {objects} = this.state

        return (
            <div className="container">
                {objects.length > 0 && (
                    <div>
                        <CartHeader/>

                        <div className={style.container}>
                            {objects.map(object =>
                                <CartObject
                                    object={object}
                                    key={object.id}
                                    handleCartRemove={this.handleCartRemove}
                                    handleQuantityIncrease={this.handleQuantityIncrease}
                                    handleQuantityDecrease={this.handleQuantityDecrease}
                                />
                            )}
                        </div>

                        <div className="row">
                            <div className="col-lg-4">
                                <CouponForm/>
                            </div>

                            <div className="col-lg-6 offset-lg-2">
                                <CartTotal objects={objects}/>
                            </div>
                        </div>
                    </div>
                )}

                {!objects.length && (
                    <Title>Cart is empty</Title>
                )}
            </div>
        );
    }
}

export default Cart;