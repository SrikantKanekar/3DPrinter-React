import {Component, Fragment} from "react";
import {Redirect, Route, Switch} from "react-router-dom"
import {setupTheme, toggleTheme} from "./util/theme";
import {ToastContainer} from "react-toastify";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar/navBar";
import Home from "./components/home";
import LoginForm from "./features/auth/loginForm";
import RegisterForm from "./features/auth/registerForm";
import Account from "./features/account/account";
import Logout from "./features/auth/logout";
import auth from "./features/auth/authService";
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
                <main className="container">
                    <Switch>
                        <Route path="/login" component={LoginForm}/>
                        <Route path="/register" component={RegisterForm}/>
                        <Route path="/logout" component={Logout}/>
                        <Route path="/account" component={Account}/>
                        <Route path="/not-found" component={NotFound}/>
                        <Route path="/" exact component={Home}/>
                        <Redirect to="/not-found"/>
                    </Switch>
                </main>
            </Fragment>
        );
    }
}

export default App;
