import React, {Component, Fragment} from 'react';
import {Link, NavLink} from "react-router-dom";
import styles from "./menu.module.css"

class Menu extends Component {
    state = {
        accountMenu: false
    }

    toggleAccountMenu = (e) => {
        e.preventDefault()
        e.stopPropagation()
        this.setState({accountMenu: !this.state.accountMenu})
    }

    render() {
        const {user, menu} = this.props
        const isExpanded = menu ? styles.active : ''
        const isCollapsed = this.state.accountMenu ? styles.active : ''

        return (
            <div className={`${styles.menu} ${isExpanded}`} onClick={this.props.closeMenu}>
                <div className={styles.container}>
                    <ul className={styles.content}>
                        <li>
                            <NavLink exact to="/">Home</NavLink>
                        </li>
                        {user && (
                            <Fragment>
                                <li>
                                    <NavLink to="/objects/create">Create</NavLink>
                                </li>

                                <li>
                                    <NavLink exact to="/objects">My Objects</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/account">
                                        Account<i
                                        className="fa fa-angle-down"
                                        onClick={e => this.toggleAccountMenu(e)}/>
                                    </NavLink>
                                    <ul className={`${styles.collapsible} ${isCollapsed}`}>
                                        <li>
                                            <Link to="/account">Account</Link>
                                        </li>
                                        <li>
                                            <Link to="/orders">Orders</Link>
                                        </li>
                                        <li>
                                            <Link to="/notifications">Notifications</Link>
                                        </li>
                                        <li>
                                            <Link to="/account/logout">Logout</Link>
                                        </li>
                                    </ul>
                                </li>
                            </Fragment>
                        )}

                        {user && user.isAdmin && (
                            <li>
                                <NavLink to="/admin">Admin</NavLink>
                            </li>
                        )}
                    </ul>
                </div>

                <div className={styles.close} onClick={this.props.closeMenu}>
                    <i className="fa fa-times" aria-hidden="true"/>
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
        );
    }
}

export default Menu;