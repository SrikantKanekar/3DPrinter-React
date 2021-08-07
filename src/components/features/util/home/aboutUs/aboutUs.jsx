import React from 'react';
import {Link} from "react-router-dom";
import styles from "./aboutUs.module.css"

function AboutUs() {
    return (
        <section className={`${styles.about} section-bg`}>
            <div className="container">
                <div className="row no-gutters">
                    <div className={`${styles.content} col-xl-5`}>
                        <h3>Voluptatem dignissimos provident quasi</h3>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                            incididunt ut
                            labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit
                        </p>
                        <Link to="#" className={styles.button}>
                            <span>About us</span> <i className="bx bx-chevron-right"/>
                        </Link>
                    </div>

                    <div className="col-xl-7">
                        <div className={`row ${styles.services}`}>
                            <div className="col-md-6">
                                <i className="bx bx-receipt"/>
                                <h4>Corporis voluptates sit</h4>
                                <p>Consequuntur sunt aut quasi enim aliquam quae harum pariatur laboris nisi
                                    ut
                                    aliquip</p>
                            </div>
                            <div className="col-md-6">
                                <i className="bx bx-cube-alt"/>
                                <h4>Ullamco laboris nisi</h4>
                                <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                                    deserunt</p>
                            </div>
                            <div className="col-md-6">
                                <i className="bx bx-images"/>
                                <h4>Labore consequatur</h4>
                                <p>Aut suscipit aut cum nemo deleniti aut omnis. Doloribus ut maiores omnis
                                    facere</p>
                            </div>
                            <div className="col-md-6">
                                <i className="bx bx-shield"/>
                                <h4>Beatae veritatis</h4>
                                <p>Expedita veritatis consequuntur nihil tempore laudantium vitae denat
                                    pacta</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutUs;