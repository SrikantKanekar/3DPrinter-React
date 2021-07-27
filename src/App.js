import {Component, Fragment} from "react";
import {Redirect, Route, Switch} from "react-router-dom"
import {setupTheme, toggleTheme} from "./util/theme";
import NotFound from "./components/features/util/notFound/notFound";
import ProtectedRoute from "./components/protectedRoute";
import {ToastContainer} from "react-toastify";
import NavBar from "./components/navBar/navBar";
import Home from "./components/features/util/home/home";
import Account from "./components/features/account/account";
import Logout from "./components/features/auth/logout/logout";
import auth from "./services/authService";
import Footer from "./components/footer/footer";
import Login from "./components/features/auth/login/login";
import Register from "./components/features/auth/register/register";
import Admin from "./components/features/admin/admin";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import './components/canvas/canvas.css'
import Cart from "./components/features/cart/cart";
import Checkout from "./components/features/checkout/checkout";
import Notifications from "./components/features/notification/notifications/notifications";
import Notification from "./components/features/notification/notification/notification";
import Objects from "./components/features/objects/objects/objects";
import ObjectGet from "./components/features/objects/object/object";
import Orders from "./components/features/orders/orders/orders";
import Order from "./components/features/orders/order/order";
import Create from "./components/features/objects/create/create";

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
                        <ProtectedRoute path="/account" component={Account}/>
                        <ProtectedRoute path="/admin" component={Admin}/>

                        <Route path="/login" component={Login}/>
                        <Route path="/register" component={Register}/>
                        <Route path="/logout" component={Logout}/>

                        <ProtectedRoute path="/cart" component={Cart}/>
                        <ProtectedRoute path="/checkout" component={Checkout}/>

                        <ProtectedRoute path="/notifications/:id" component={Notification}/>
                        <ProtectedRoute exact path="/notifications" component={Notifications}/>

                        <ProtectedRoute path="/objects/create" component={Create}/>
                        <ProtectedRoute path="/objects/:id" component={ObjectGet}/>
                        <ProtectedRoute exact path="/objects" component={Objects}/>

                        <ProtectedRoute path="/orders/:id" component={Order}/>
                        <ProtectedRoute exact path="/orders" component={Orders}/>

                        <Route path="/not-found" component={NotFound}/>
                        <Route exact path="/" component={Home}/>
                        <Redirect to="/not-found"/>
                    </Switch>
                </main>
                <Footer/>
            </Fragment>
        );
    }
}

export default App;
