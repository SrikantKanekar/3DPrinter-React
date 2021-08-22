import React, {Fragment} from 'react';
import auth from "../../../services/authService";
import {Route} from "react-router-dom";
import AdminOrders from "./adminOrders/adminOrders";
import Button from "../../util/button/button";
import styles from "./admin.module.css"
import DirectRequests from "./directRequests/directRequests";
import SpecialRequests from "./specialRequests/specialRequests";

class Admin extends React.Component {

    constructor(props) {
        super(props);
        const user = auth.getCurrentUser()
        if (!user.isAdmin) this.props.history.replace("/not-found");
        this.state = {isAdmin: user.isAdmin}
    }

    render() {
        return (
            <Fragment>
                <div className={styles.buttons}>
                    <Button url="/admin" label="Orders" />
                    <Button url="/admin/special-requests" label="Special Requests" />
                    <Button url="/admin/direct-requests" label="Direct Requests" />
                </div>
                <Fragment>
                    <Route path="/admin/special-requests" component={SpecialRequests}/>
                    <Route path="/admin/direct-requests" component={DirectRequests}/>
                    <Route exact path="/admin" component={AdminOrders}/>
                </Fragment>
            </Fragment>
        );
    }
}

export default Admin;