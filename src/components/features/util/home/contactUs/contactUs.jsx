import React from 'react';
import ContactUsForm from "./contactUsForm";
import styles from "./contactUs.module.css"

function ContactUs() {
    return (
        <section>
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
                                <div className={styles.contact}>
                                    <i className="bx bx-map"/>
                                    <h3>Our Address</h3>
                                    <p>A108 Adam Street, New York, NY 535022</p>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className={`${styles.contact} mt-4`}>
                                    <i className="bx bx-envelope"/>
                                    <h3>Email Us</h3>
                                    <p>info@example.com<br/>contact@example.com</p>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className={`${styles.contact} mt-4`}>
                                    <i className="bx bx-phone-call"/>
                                    <h3>Call Us</h3>
                                    <p>+1 5589 55488 55<br/>+1 6678 254445 41</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <ContactUsForm/>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ContactUs;