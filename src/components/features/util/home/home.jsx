import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Button from "../../../button/button";
import "boxicons/css/boxicons.css";
import "bootstrap-icons/font/bootstrap-icons.css"
import "./home.css"

class Home extends Component {
    render() {
        return (
            <div>
                <div className="hero">
                    <div className="hero_text">
                        Welcome
                    </div>
                    <Button
                        url="/objects/create"
                        label="Create"
                    />

                </div>

                <section id="about" className="about section-bg">
                    <div className="container">
                        <div className="row no-gutters">
                            <div className="content col-xl-5 d-flex align-items-stretch">
                                <div className="content">
                                    <h3>Voluptatem dignissimos provident quasi</h3>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                        incididunt ut
                                        labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit
                                    </p>
                                    <Link to="#" className="about-btn">
                                        <span>About us</span> <i className="bx bx-chevron-right"/>
                                    </Link>
                                </div>
                            </div>

                            <div className="col-xl-7 d-flex align-items-stretch">
                                <div className="icon-boxes d-flex flex-column justify-content-center">
                                    <div className="row">
                                        <div className="col-md-6 icon-box">
                                            <i className="bx bx-receipt"/>
                                            <h4>Corporis voluptates sit</h4>
                                            <p>Consequuntur sunt aut quasi enim aliquam quae harum pariatur laboris nisi
                                                ut
                                                aliquip</p>
                                        </div>
                                        <div className="col-md-6 icon-box">
                                            <i className="bx bx-cube-alt"/>
                                            <h4>Ullamco laboris nisi</h4>
                                            <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                                                deserunt</p>
                                        </div>
                                        <div className="col-md-6 icon-box">
                                            <i className="bx bx-images"/>
                                            <h4>Labore consequatur</h4>
                                            <p>Aut suscipit aut cum nemo deleniti aut omnis. Doloribus ut maiores omnis
                                                facere</p>
                                        </div>
                                        <div className="col-md-6 icon-box">
                                            <i className="bx bx-shield"/>
                                            <h4>Beatae veritatis</h4>
                                            <p>Expedita veritatis consequuntur nihil tempore laudantium vitae denat
                                                pacta</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                <section id="counts" className="counts">
                    <div className="container">

                        <div className="row">

                            <div className="col-lg-3 col-md-6">
                                <div className="count-box">
                                    <i className="bi bi-emoji-smile"/>
                                    <span>130</span>
                                    <p>Happy Clients</p>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-6 mt-5 mt-md-0">
                                <div className="count-box">
                                    <i className="bi bi-journal-richtext"/>
                                    <span>540</span>
                                    <p>Projects</p>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-6 mt-5 mt-lg-0">
                                <div className="count-box">
                                    <i className="bi bi-headset"/>
                                    <span>5243</span>
                                    <p>Hours Of Support</p>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-6 mt-5 mt-lg-0">
                                <div className="count-box">
                                    <i className="bi bi-people"/>
                                    <span>3</span>
                                    <p>Hard Workers</p>
                                </div>
                            </div>

                        </div>

                    </div>
                </section>


                <section id="pricing" className="pricing section-bg">
                    <div className="container">

                        <div className="section-title">
                            <h2>Pricing</h2>
                            <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum
                                quidem. Sit sint
                                consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias
                                ea.</p>
                        </div>

                        <div className="row">

                            <div className="col-lg-4 col-md-6">
                                <div className="box">
                                    <h3>Free</h3>
                                    <h4><sup>$</sup>0<span> / month</span></h4>
                                    <ul>
                                        <li>Aida dere</li>
                                        <li>Nec feugiat nisl</li>
                                        <li>Nulla at volutpat dola</li>
                                        <li className="na">Pharetra massa</li>
                                        <li className="na">Massa ultricies mi</li>
                                    </ul>
                                    <div className="btn-wrap">
                                        <Link to="#" className="btn-buy">Buy Now</Link>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6 mt-4 mt-md-0">
                                <div className="box featured">
                                    <h3>Business</h3>
                                    <h4><sup>$</sup>19<span> / month</span></h4>
                                    <ul>
                                        <li>Aida dere</li>
                                        <li>Nec feugiat nisl</li>
                                        <li>Nulla at volutpat dola</li>
                                        <li>Pharetra massa</li>
                                        <li className="na">Massa ultricies mi</li>
                                    </ul>
                                    <div className="btn-wrap">
                                        <Link to="#" className="btn-buy">Buy Now</Link>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6 mt-4 mt-lg-0">
                                <div className="box">
                                    <h3>Developer</h3>
                                    <h4><sup>$</sup>29<span> / month</span></h4>
                                    <ul>
                                        <li>Aida dere</li>
                                        <li>Nec feugiat nisl</li>
                                        <li>Nulla at volutpat dola</li>
                                        <li>Pharetra massa</li>
                                        <li>Massa ultricies mi</li>
                                    </ul>
                                    <div className="btn-wrap">
                                        <Link to="#" className="btn-buy">Buy Now</Link>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </section>


                <section id="contact" className="contact">
                    <div className="container">

                        <div className="section-title">
                            <h2>Contact</h2>
                            <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum
                                quidem. Sit sint
                                consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias
                                ea.</p>
                        </div>

                        <div className="row align-items-center">

                            <div className="col-lg-6">

                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="info-box">
                                            <i className="bx bx-map"/>
                                            <h3>Our Address</h3>
                                            <p>A108 Adam Street, New York, NY 535022</p>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="info-box mt-4">
                                            <i className="bx bx-envelope"/>
                                            <h3>Email Us</h3>
                                            <p>info@example.com<br/>contact@example.com</p>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="info-box mt-4">
                                            <i className="bx bx-phone-call"/>
                                            <h3>Call Us</h3>
                                            <p>+1 5589 55488 55<br/>+1 6678 254445 41</p>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="col-lg-6">
                                <form action="#" method="post" className="form" id="contact_form">
                                    <div className="row">
                                        <div className="col-xl-6">
                                            <label htmlFor="name">Your Name*</label>
                                            <div data-validate="Enter Name">
                                                <input name="name" type="text" id="name" className="input"/>
                                            </div>
                                        </div>
                                        <div className="col-xl-6">
                                            <label htmlFor="email">Email*</label>
                                            <div data-validate="Invalid">
                                                <input name="email" type="email" id="email" className="input"/>
                                            </div>
                                        </div>
                                    </div>
                                    <label htmlFor="subject">Subject*</label>
                                    <div data-validate="Please fill">
                                        <input name="subject" type="text" id="subject" className="input"/>
                                    </div>

                                    <label htmlFor="message">Message*</label>
                                    <div data-validate="Please fill">
                                        <textarea name="message" rows="7" id="message" className="textarea"/>
                                    </div>

                                    <div className="form_message"/>

                                    <Button
                                        label="Send"
                                    />

                                </form>
                            </div>

                        </div>

                    </div>
                </section>
            </div>
        );
    }
}

export default Home;