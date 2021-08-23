import React, {Component} from 'react';
import {Link} from "react-router-dom";
import styles from "./footer.module.css"

class Footer extends Component {
    render() {
        return (
            <footer className="container">
                    <div className="row">
                        <div className="col">
                            <div className={styles.content}>
                                <div className={styles.logo}>
                                    <Link to="/">AvvonMark</Link>
                                </div>
                                <div className={styles.copyright}>
                                    Copyright &copy; All rights reserved | This template is made with <i className="fa fa-heart-o" aria-hidden="true"/> by Colorlib
                                </div>
                                <div className={styles.social}>
                                    <ul>
                                        <li>
                                            <Link to="#"><i className="fa fa-pinterest" aria-hidden="true"/></Link>
                                        </li>
                                        <li>
                                            <Link to="#"><i className="fa fa-instagram" aria-hidden="true"/></Link>
                                        </li>
                                        <li>
                                            <Link to="#"><i className="fa fa-facebook" aria-hidden="true"/></Link>
                                        </li>
                                        <li>
                                            <Link to="#"><i className="fa fa-twitter" aria-hidden="true"/></Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
            </footer>
        );
    }
}

export default Footer;