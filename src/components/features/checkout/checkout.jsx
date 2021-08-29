import React from 'react';
import Joi from "joi-browser";
import {toast} from "react-toastify";
import account from "../../../services/accountService";
import checkout from "../../../services/checkoutService";
import FormContainer from "../../form/formContainer/formContainer";
import Form from "../../form/form";
import Title from "../../util/title/title";
import Total from "./total/total";
import styles from "./checkout.module.css"

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
            .max(50)
            .label("First Name"),
        lastname: Joi.string()
            .min(1)
            .max(50)
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

    doSubmit = async () => {
        try {
            const {data} = this.state;
            await account.updateAddress(data)
            await this.displayRazorpay()
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                this.setState({formError: ex.response.data});
            }
        }
    };

    loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    displayRazorpay = async () => {
        const res = await this.loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            toast.dark("Razorpay SDK failed to load. Are you online?");
            return;
        }

        const result = await checkout.proceed();

        if (!result) {
            toast.dark("Server error. Are you online?");
            return;
        }

        const {price, _id} = result.data;

        const logo = process.env.PUBLIC_URL + '/logo.jpg'
        const options = {
            key: "rzp_test_oude3vJ48mVrXI",
            amount: price.toString(),
            currency: "INR",
            name: "AvvonMark",
            description: "Test Transaction",
            image: {logo},
            order_id: _id,
            handler: async (response) => {
                const data = {
                    id: _id,
                    order_id: response.razorpay_order_id,
                    payment_id: response.razorpay_payment_id,
                    signature: response.razorpay_signature,
                };

                await checkout.verify(data);
                this.props.history.replace("/orders")
            },
            theme: {
                color: "#de2728",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    render() {
        const {objects} = this.state

        return (
            <div className={`container ${styles.checkout}`}>
                {objects.length > 0 && (
                    <div className="row">
                        <div className="col-lg-6">
                            <FormContainer
                                title="Billing Address"
                                subtitle="Enter your address info"
                                formError={this.state.formError}>
                                <div className="row">
                                    <div className="col-xl-6">
                                        {this.renderInput("firstname", "First Name*")}
                                    </div>
                                    <div className="col-xl-6 field_margin">
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

                        <div className="col-lg-6">
                            <Total
                                objects={objects}
                                handleSubmit={this.handleSubmit}
                            />
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