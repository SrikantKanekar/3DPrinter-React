import React, {Component} from 'react';
import Hero from "./hero/hero";
import AboutUs from "./aboutUs/aboutUs";
import Counts from "./counts/counts";
import Pricing from "./pricing/pricing";
import ContactUs from "./contactUs/contactUs";
import "boxicons/css/boxicons.css";
import "bootstrap-icons/font/bootstrap-icons.css"
import "./home.css"

class Home extends Component {
    render() {
        return (
            <div>
                <Hero/>
                <AboutUs/>
                <Counts/>
                <Pricing/>
                <ContactUs/>
            </div>
        );
    }
}

export default Home;