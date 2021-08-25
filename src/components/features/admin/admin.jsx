import React, {Fragment} from 'react';
import auth from "../../../services/authService";
import {Route} from "react-router-dom";
import AdminOrders from "./adminOrders/adminOrders";
import Button from "../../util/button/button";
import ObjectRequests from "./objectRequests/list/objectRequests";
import SpecialRequests from "./specialRequests/list/specialRequests";
import ObjectRequest from "./objectRequests/detail/objectRequest";
import SpecialRequest from "./specialRequests/detail/specialRequest";
import styles from "./admin.module.css"

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
                    <Button url="/admin/objects" label="Objects" />
                    <Button url="/admin/requests/special" label="Special Requests" />
                </div>
                <Fragment>
                    <Route path="/admin/objects/:email/:id" component={ObjectRequest}/>
                    <Route exact path="/admin/objects" component={ObjectRequests}/>

                    <Route path="/admin/requests/special/:id" component={SpecialRequest}/>
                    <Route exact path="/admin/requests/special" component={SpecialRequests}/>

                    <Route exact path="/admin" component={AdminOrders}/>
                </Fragment>
            </Fragment>
        );
    }
}

export default Admin;