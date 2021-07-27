import React, {Component} from 'react';
import {Link} from "react-router-dom";
import "./footer.css"

class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="
								footer_content
								d-flex
								flex-lg-row flex-column
								align-items-center
								justify-content-lg-start
								justify-content-center
							">
                                <div className="footer_logo">
                                    <Link to="/">3D Printing</Link>
                                </div>
                                <div className="copyright ml-auto mr-auto">
                                    Copyright &copy; All rights reserved | This template is made with <i className="fa fa-heart-o" aria-hidden="true"/> by Colorlib
                                </div>
                                <div className="footer_social ml-lg-auto">
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
                </div>
            </footer>
        );
    }
}

export default Footer;