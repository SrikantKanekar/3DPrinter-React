import React from 'react';
import {Menu, MenuItem, ProSidebar, SidebarContent, SidebarFooter, SidebarHeader} from "react-pro-sidebar";
import {FiHome, FiLogOut} from "react-icons/fi";
import {FaList, FaRegHeart} from "react-icons/fa";
import {Link, NavLink} from "react-router-dom";
import 'react-pro-sidebar/dist/css/styles.css';
import "./accountSidebar.css"

function AccountSidebar({toggled, handleToggleSidebar}) {

    return (
        <ProSidebar
            toggled={toggled}
            breakPoint="md"
            onToggle={handleToggleSidebar}>

            <SidebarHeader>
                <div className="logotext">
                    <p>Account</p>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <Menu iconShape="square">
                    <MenuItem icon={<FiHome/>}>
                        Details
                        <NavLink exact to="/account"/>
                    </MenuItem>
                    <MenuItem icon={<FaList/>}>
                        Update
                        <NavLink to="/account/update"/>
                    </MenuItem>
                    <MenuItem icon={<FaRegHeart/>}>
                        Reset Password
                        <NavLink to="/account/reset-password"/>
                    </MenuItem>
                </Menu>
            </SidebarContent>
            <SidebarFooter>
                <Menu iconShape="square">
                    <MenuItem icon={<FiLogOut/>}>
                        Logout
                        <Link to="/logout"/>
                    </MenuItem>
                </Menu>
            </SidebarFooter>
        </ProSidebar>
    );
}

export default AccountSidebar;