import React from 'react';
import {Link} from "react-router-dom";
import styles from "./pricing.module.css"

function Pricing() {
    return (
        <section className="section-bg">
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
                        <div className={styles.box}>
                            <h3>Free</h3>
                            <h4><sup>$</sup>0<span> / month</span></h4>
                            <ul>
                                <li>Aida dere</li>
                                <li>Nec feugiat nisl</li>
                                <li>Nulla at volutpat dola</li>
                                <li className={styles.na}>Pharetra massa</li>
                                <li className={styles.na}>Massa ultricies mi</li>
                            </ul>
                            <div className={styles.button}>
                                <Link to="/objects/create">Buy Now</Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6 mt-4 mt-md-0">
                        <div className={`${styles.box} ${styles.featured}`}>
                            <h3>Business</h3>
                            <h4><sup>$</sup>19<span> / month</span></h4>
                            <ul>
                                <li>Aida dere</li>
                                <li>Nec feugiat nisl</li>
                                <li>Nulla at volutpat dola</li>
                                <li>Pharetra massa</li>
                                <li className={styles.na}>Massa ultricies mi</li>
                            </ul>
                            <div className={styles.button}>
                                <Link to="/objects/create">Buy Now</Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6 mt-4 mt-lg-0">
                        <div className={styles.box}>
                            <h3>Developer</h3>
                            <h4><sup>$</sup>29<span> / month</span></h4>
                            <ul>
                                <li>Aida dere</li>
                                <li>Nec feugiat nisl</li>
                                <li>Nulla at volutpat dola</li>
                                <li>Pharetra massa</li>
                                <li>Massa ultricies mi</li>
                            </ul>
                            <div className={styles.button}>
                                <Link to="/objects/create">Buy Now</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Pricing;