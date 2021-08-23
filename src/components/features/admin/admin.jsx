import React, {Fragment} from 'react';
import auth from "../../../services/authService";
import {Route} from "react-router-dom";
import AdminOrders from "./adminOrders/adminOrders";
import Button from "../../util/button/button";
import styles from "./admin.module.css"
import DirectRequests from "./directRequests/list/directRequests";
import SpecialRequests from "./specialRequests/list/specialRequests";
import DirectRequest from "./directRequests/detail/directRequest";
import SpecialRequest from "./specialRequests/detail/specialRequest";

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
                    <Button url="/admin/requests/direct" label="Direct Requests" />
                    <Button url="/admin/requests/special" label="Special Requests" />
                </div>
                <Fragment>
                    <Route path="/admin/requests/direct/:id" component={DirectRequest}/>
                    <Route exact path="/admin/requests/direct" component={DirectRequests}/>

                    <Route path="/admin/requests/special/:id" component={SpecialRequest}/>
                    <Route exact path="/admin/requests/special" component={SpecialRequests}/>

                    <Route exact path="/admin" component={AdminOrders}/>
                </Fragment>
            </Fragment>
        );
    }
}

export default Admin;