import {Component, Fragment} from "react";
import Header from "./header/header";
import Menu from "./menu/menu";
import auth from "../../services/authService";

class NavBar extends Component {
    state = {
        user: {},
        menu: false
    }

    componentDidMount() {
        const user = auth.getCurrentUser()
        this.setState({user})
    }

    openMenu = () => {
        this.setState({menu: true})
    }

    closeMenu = () => {
        this.setState({menu: false})
    }

    render() {
        const {user} = this.state
        return (
            <Fragment>
                <Header
                    user={user}
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