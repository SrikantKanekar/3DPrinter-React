import React, {Component} from 'react';
import {Link, NavLink} from "react-router-dom";
import "./menu.css"

class Menu extends Component {
    render() {
        const {user, menu} = this.props
        const menuClasses = menu ? 'menu active' : 'menu'

        return (
            <div className={menuClasses} onClick={this.props.closeMenu}>
                <div className="menu_container">
                    <div className="menu_content">
                        <ul className="menu_nav">

                            <li className="menu_item">
                                <NavLink exact={true} to="/">Home<i className="fa fa-angle-down"/></NavLink>
                            </li>

                            <li className="menu_item">
                                <NavLink to="/objects/create">Create<i className="fa fa-angle-down"/></NavLink>
                            </li>

                            <li className="menu_item">
                                <NavLink exact to="/objects">My Objects<i className="fa fa-angle-down"/></NavLink>
                            </li>

                            {user && (
                                <li className="menu_item has-children">
                                    <NavLink to="/account">Account<i className="fa fa-angle-down"/></NavLink>
                                    <ul className="menu_selection">
                                        <li className="menu_item">
                                            <Link to="/account">Account<i className="fa fa-angle-down"/></Link>
                                        </li>
                                        <li className="menu_item">
                                            <Link to="/orders">Orders<i className="fa fa-angle-down"/></Link>
                                        </li>
                                        <li className="menu_item">
                                            <Link to="/notifications">
                                                Notifications<i className="fa fa-angle-down"/>
                                            </Link>
                                        </li>
                                        <li className="menu_item">
                                            <Link to="/account/logout">Logout<i className="fa fa-angle-down"/></Link>
                                        </li>
                                    </ul>
                                </li>
                            )}

                            {user && user.isAdmin && (
                                <li className="menu_item">
                                    <NavLink to="/admin">Admin<i className="fa fa-angle-down"/></NavLink>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>

                <div className="menu_close" onClick={this.props.closeMenu}>
                    <i className="fa fa-times" aria-hidden="true"/>
                </div>

                <div className="menu_social">
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
        );
    }
}

export default Menu;