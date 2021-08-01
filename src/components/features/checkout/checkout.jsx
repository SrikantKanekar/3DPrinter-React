import React from 'react';
import Joi from "joi-browser";
import {toast} from "react-toastify";
import account from "../../../services/accountService";
import checkout from "../../../services/checkoutService";
import FormContainer from "../../form/formContainer";
import Form from "../../form/form";
import Button from "../../util/button/button";
import Title from "../../util/title/title";
import "./checkout.module.css"

class Checkout extends Form {
    state = {
        objects: [],
        data: {
            firstname: "",
            lastname: "",
            phoneNumber: "",
            address: "",
            city: "",
            state: "",
            country: "",
            pinCode: ""
        },
        errors: {},
        formError: ''
    };

    async componentDidMount() {
        try {
            const {data} = await checkout.get()
            this.setState({objects: data.objects, data: data.address})
        } catch (e) {
            toast.dark(e.message)
        }
    }

    schema = {
        firstname: Joi.string()
            .min(2)
            .label("First Name"),
        lastname: Joi.string()
            .min(2)
            .label("Last Name"),
        phoneNumber: Joi
            .required()
            .label("Phone Number"),
        address: Joi.string()
            .required()
            .label("Address"),
        city: Joi.string()
            .required()
            .label("City"),
        state: Joi.string()
            .required()
            .label("State"),
        country: Joi.string()
            .required()
            .label("Country"),
        pinCode: Joi
            .required()
            .label("Pin Code")
    };

    calculateTotal = () => {
        const objects = this.state.objects
        let total = 0
        objects.forEach((object) => {
            total += object.quantity * object.slicingDetails.totalPrice
        })
        return total
    }

    doSubmit = async () => {
        try {
            const {data} = this.state;
            await account.updateAddress(data)
            await this.handleProceed()
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                this.setState({formError: ex.response.data});
            }
        }
    };

    handleProceed = async () => {
        try {
            await checkout.proceed()
            this.props.history.replace("/orders")
        } catch (e) {
            toast.dark(e.message)
        }
    }

    render() {
        const {objects} = this.state

        return (
            <div className="container">
                {objects.length && (
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="checkout_section">
                                <FormContainer
                                    title="Billing Address"
                                    subtitle="Enter your address info"
                                    formError={this.state.formError}>
                                    <div className="row">
                                        <div className="col-xl-6">
                                            {this.renderInput("firstname", "First Name*")}
                                        </div>
                                        <div className="col-xl-6">
                                            {this.renderInput("lastname", "Last Name*")}
                                        </div>
                                    </div>
                                    {this.renderInput("phoneNumber", "Phone no*", "phone")}
                                    {this.renderInput("address", "Address*")}
                                    {this.renderSelect("city", "City/Town*", this.cities)}
                                    {this.renderSelect("state", "State*", this.states)}
                                    {this.renderSelect("country", "Country*", this.countries)}
                                    {this.renderInput("pinCode", "PinCode*", "number")}
                                </FormContainer>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="checkout_order checkout_section">
                                <div className="section_title">Your order</div>
                                <div className="section_subtitle">Order details</div>

                                <div className="order_list_container">
                                    <div className="header">
                                        <div className="name">Object</div>
                                        <div className="details">
                                            <div className="quantity">Qty.</div>
                                            <div className="price">Price</div>
                                        </div>
                                    </div>
                                    <ul className="order_list">
                                        {objects.map(object =>
                                            <li className="list_item object">
                                                <div className="object">{object.name}</div>
                                                <div className="details">
                                                    <div className="quantity">X<span>{object.quantity}</span></div>
                                                    <div className="price">
                                                        <i className="fa fa-inr"/><span>{object.slicingDetails.totalPrice}</span>
                                                    </div>
                                                </div>
                                            </li>
                                        )}
                                        <li className="list_item">
                                            <div className="object">Subtotal</div>
                                            <div className="price subtotal">
                                                <i className="fa fa-inr"/><span>{this.calculateTotal()}</span>
                                            </div>
                                        </li>
                                        <li className="list_item">
                                            <div className="object">Shipping</div>
                                            <div className="price">Free</div>
                                        </li>
                                        <li className="list_item">
                                            <div className="object">Total</div>
                                            <div className="price total">
                                                <i className="fa fa-inr"/><span>{this.calculateTotal()}</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="order_button">
                                    <Button label="Place Order" onClick={this.handleSubmit}/>
                                </div>
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

    cities = [
        {id: "Panaji", name: "Panaji"},
        {id: "Margao", name: "Margao"}
    ]

    states = [
        {id: "Goa", name: "Goa"},
        {id: "Karnataka", name: "Karnataka"}
    ]

    countries = [
        {id: "India", name: "India"}
    ]
}

export default Checkout;