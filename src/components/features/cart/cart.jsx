import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Button from "../../button/button";
import cart from "../../../services/cartService";
import {toast} from "react-toastify";
import "./cart.css"
import objectService from "../../../services/objectService";

class Cart extends Component {
    state = {
        objects: []
    }

    async componentDidMount() {
        const {data: objects} = await cart.get()
        this.setState({objects})
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

    handleCouponSubmit = (e) => {
        e.preventDefault()
        toast.dark("Invalid coupon id")
    }

    calculateTotal = () => {
        const objects = this.state.objects
        let total = 0
        objects.forEach((object) => {
            total += object.quantity * object.slicingDetails.totalPrice
        })
        return total
    }

    render() {
        const {objects} = this.state

        if (objects.length === 0) return <div className="container">No items</div>

        return (
            <div className="container">
                <div className="cart">

                    <div className="row">
                        <div className="col">
                            <div className="info_column clearfix">
                                <div className="info_object">Object</div>
                                <div className="info_price">Price</div>
                                <div className="info_quantity">Qty.</div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <div className="cart_grid">
                                {objects.map(object =>
                                    <div className="cart_item" key={object.id}>

                                        <div className="item_object">

                                            <div className="item_image">
                                                <img src={object.imageUrl} alt=""/>
                                            </div>

                                            <div className="item_name_container">
                                                <div className="item_name">
                                                    <Link to={`/objects/${object.id}`}>{object.name}</Link>
                                                </div>
                                                <div className="item_remove">
                                                    <a href="/"
                                                       onClick={e => this.handleCartRemove(e, object)}>remove</a>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="item_price"><i
                                            className="fa fa-inr"/> {object.slicingDetails.totalPrice}
                                        </div>

                                        <div className="item_quantity">
                                            <div className="quantity">
                                                <span>Qty</span>

                                                <div className="input">{object.quantity}</div>

                                                <div className="quantity_buttons">
                                                    <div className="quantity_inc quantity_control"
                                                         onClick={() => this.handleQuantityIncrease(object)}>
                                                        <i className="fa fa-chevron-up" aria-hidden="true"/>
                                                    </div>

                                                    <div className="quantity_dec quantity_control"
                                                         onClick={() => this.handleQuantityDecrease(object)}>
                                                        <i className="fa fa-chevron-down" aria-hidden="true"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="row row_extra">

                        <div className="col-lg-4">
                            <div className="section_title">Coupon code</div>
                            <div className="section_subtitle">Enter your coupon code</div>
                            <div className="coupon_form_container">
                                <form id="coupon_form" className="coupon_form">
                                    <input type="text" className="coupon_input"/>
                                    <div className="coupon_button">
                                        <Button label="Apply" onClick={e => this.handleCouponSubmit(e)}/>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="col-lg-6 offset-lg-2">
                            <div className="cart_total">
                                <div className="section_title">Cart total</div>
                                <div className="total_container">
                                    <div className="list_bar">
                                        <div className="list_title">Object</div>
                                        <div className="list_details">
                                            <div className="list_quantity">Qty.</div>
                                            <div className="list_price">Price</div>
                                        </div>
                                    </div>
                                    <ul>
                                        {objects.map(object =>
                                            <li className="total_item" key={object.id}>
                                                <div className="total_title">{object.name}</div>
                                                <div className="total_details">
                                                    <div className="total_quantity">
                                                        x<span>{object.quantity}</span>
                                                    </div>
                                                    <div className="total_value">
                                                        <i className="fa fa-inr"/>
                                                        <span>{object.slicingDetails.totalPrice}</span>
                                                    </div>
                                                </div>
                                            </li>
                                        )}
                                        <li className="total_item">
                                            <div className="total_title">Subtotal</div>
                                            <div className="total_value subtotal">
                                                <i className="fa fa-inr"/> <span>{this.calculateTotal()}</span>
                                            </div>
                                        </li>
                                        <li className="total_item">
                                            <div className="total_title">Shipping</div>
                                            <div className="total_value">Free</div>
                                        </li>
                                        <li className="total_item">
                                            <div className="total_title">Total</div>
                                            <div className="total_value total">
                                                <i className="fa fa-inr"/> <span>{this.calculateTotal()}</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="checkout_button">
                                    <Button
                                        label="Proceed to checkout"
                                        url="/checkout"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Cart;