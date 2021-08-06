import React, {useState} from 'react';
import styles from "./accountDetail.module.css"
import auth from "../../../../services/authService";

function AccountDetail() {
    const [user] = useState(auth.getCurrentUser())

    return (
        <div className={styles.container}>
            <p>Username : {user.username}</p>
            <p>Email : {user.email}</p>
        </div>
    )
}

export default AccountDetail;