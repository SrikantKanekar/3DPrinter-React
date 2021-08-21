import {Component, Fragment} from "react";
import {Redirect, Route, Switch} from "react-router-dom"
import theme from "./util/theme";
import {ToastContainer} from "react-toastify";
import ScrollToTop from "./components/util/scrollToTop";
import ProtectedRoute from "./components/util/protectedRoute";
import NotFound from "./components/features/util/notFound/notFound";
import Account from "./components/features/account/account";
import Admin from "./components/features/admin/admin";
import Login from "./components/features/auth/login/login";
import Register from "./components/features/auth/register/register";
import Logout from "./components/features/auth/logout/logout";
import Create from "./components/features/objects/create/create";
import Objects from "./components/features/objects/objects/objects";
import ObjectGet from "./components/features/objects/object/object";
import Cart from "./components/features/cart/cart";
import Checkout from "./components/features/checkout/checkout";
import Orders from "./components/features/orders/orders/orders";
import Order from "./components/features/orders/order/order";
import Notifications from "./components/features/notification/notifications/notifications";
import Notification from "./components/features/notification/notification/notification";
import Home from "./components/features/util/home/home";
import NavBar from "./components/navBar/navBar";
import Footer from "./components/footer/footer";
import Spinner from "./components/util/spinner/spinner";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.css";
import "react-toastify/dist/ReactToastify.css";
import './App.css';

class App extends Component {

    componentDidMount() {
        this.hidePreloader()
        theme.setupTheme()
    }

    render() {
        return (
            <Fragment>
                <ToastContainer/>
                <Spinner/>
                <NavBar/>
                <main>
                    <ScrollToTop/>
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

                        <Route path="/objects/create" component={Create}/>
                        <Route path="/objects/:id" component={ObjectGet}/>
                        <Route exact path="/objects" component={Objects}/>

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

    hidePreloader = () => {
        const preloader = document.getElementById('preloader')
        preloader.style.opacity = '0'
        setTimeout(() => preloader.remove(), 300)
    }
}

export default App;
