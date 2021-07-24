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
                                    {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0 */}
                                    Copyright &copy; All rights reserved | This template is made with <i className="fa fa-heart-o" aria-hidden="true"/> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
                                    {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0 */}
                                </div>
                                <div className="footer_social ml-lg-auto">
                                    <ul>
                                        <li>
                                            <a href="#"><i className="fa fa-pinterest" aria-hidden="true"/></a>
                                        </li>
                                        <li>
                                            <a href="#"><i className="fa fa-instagram" aria-hidden="true"/></a>
                                        </li>
                                        <li>
                                            <a href="#"><i className="fa fa-facebook" aria-hidden="true"/></a>
                                        </li>
                                        <li>
                                            <a href="#"><i className="fa fa-twitter" aria-hidden="true"/></a>
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