import React, {useState} from 'react';
import AccountUpdateForm from "./accountUpdate/accountUpdateForm";
import ResetPasswordForm from "./ResetPassword/resetPasswordForm";
import AccountSidebar from "./accountSidebar/accountSidebar";
import AccountDetail from "./accountDetail/accountDetail";
import styles from "./account.module.css"
import {Route} from "react-router-dom";
import {FaBars} from "react-icons/all";


function Account() {
    const [toggled, setToggled] = useState(false);

    const handleToggleSidebar = (value) => {
        setToggled(value);
    };

    return (
        <div className={styles.panel}>
            <AccountSidebar
                toggled={toggled}
                handleToggleSidebar={handleToggleSidebar}
            />

            <div className={styles.content}>
                {!toggled && (
                    <div className={styles.toggle} onClick={() => handleToggleSidebar(true)}>
                        <FaBars/>
                    </div>
                )}
                <Route path="/account/reset-password" component={ResetPasswordForm}/>
                <Route path="/account/update" component={AccountUpdateForm}/>
                <Route exact path="/account" component={AccountDetail}/>
            </div>
        </div>
    );
}

export default Account;