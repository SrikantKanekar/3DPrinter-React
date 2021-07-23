import {Component, Fragment} from "react";
import Header from "./header/header";
import Menu from "./menu/menu";

class NavBar extends Component {
    state = {
        menu: false
    }

    openMenu = () => {
        this.setState({menu: true})
    }

    closeMenu = () => {
        this.setState({menu: false})
    }

    render() {
        const {user, theme, toggleTheme} = this.props
        return (
            <Fragment>
                <Header
                    user={user}
                    theme={theme}
                    toggleTheme={toggleTheme}
                    openMenu={this.openMenu}
                />
                <Menu
                    user={user}
                    menu={this.state.menu}
                    closeMenu={this.closeMenu}
                />
            </Fragment>
        );
    }
}

export default NavBar;