import React from 'react';
import styles from "./counts.module.css"

function Counts() {
    return (
        <section className={styles.counts}>
            <div className="container">

                <div className="row">

                    <div className="col-lg-3 col-md-6">
                        <div className={styles.count_box}>
                            <i className="bi bi-emoji-smile"/>
                            <span>130</span>
                            <p>Happy Clients</p>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6 mt-5 mt-md-0">
                        <div className={styles.count_box}>
                            <i className="bi bi-journal-richtext"/>
                            <span>540</span>
                            <p>Projects</p>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6 mt-5 mt-lg-0">
                        <div className={styles.count_box}>
                            <i className="bi bi-headset"/>
                            <span>5243</span>
                            <p>Hours Of Support</p>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6 mt-5 mt-lg-0">
                        <div className={styles.count_box}>
                            <i className="bi bi-people"/>
                            <span>3</span>
                            <p>Hard Workers</p>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}

export default Counts;