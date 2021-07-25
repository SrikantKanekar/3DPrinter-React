import {Component, Fragment} from "react";
import {Redirect, Route, Switch} from "react-router-dom"
import {setupTheme, toggleTheme} from "./util/theme";
import {ToastContainer} from "react-toastify";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar/navBar";
import Home from "./features/util/home";
import Account from "./features/account/account";
import Logout from "./features/auth/logout/logout";
import auth from "./services/authService";
import Footer from "./components/footer/footer";
import Login from "./features/auth/login/login";
import Register from "./features/auth/register/register";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import "react-toastify/dist/ReactToastify.css";
import './App.css';

class App extends Component {
    state = {
        theme: true,
        user: {}
    }

    componentDidMount() {
        this.setState({theme: setupTheme})
        const user = auth.getCurrentUser()
        this.setState({user})
    }

    render() {
        const {theme, user} = this.state
        return (
            <Fragment>
                <ToastContainer/>
                <NavBar
                    user={user}
                    theme={theme}
                    toggleTheme={toggleTheme}
                />
                <main>
                    <Switch>
                        <Route path="/login" component={Login}/>
                        <Route path="/register" component={Register}/>
                        <Route path="/logout" component={Logout}/>
                        <Route
                            path="/account"
                            render={(props) => (
                                <Account {...props} user={user}/>
                            )}
                        />
                        <Route path="/not-found" component={NotFound}/>
                        <Route path="/" exact component={Home}/>
                        <Redirect to="/not-found"/>
                    </Switch>
                </main>
                <Footer/>
            </Fragment>
        );
    }
}

export default App;
