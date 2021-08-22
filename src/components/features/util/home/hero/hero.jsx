import React, {Fragment} from 'react';
import Button from "../../../../util/button/button";
import auth from "../../../../../services/authService";
import styles from "./hero.module.css"

class Hero extends React.Component {

    constructor(props) {
        super(props);
        const user = auth.getCurrentUser()
        this.state = {user}
    }

    render() {
        const user = this.state.user
        return (
            <div className={styles.hero}>
                {user && (
                    <Fragment>
                        <div className={styles.welcome}>
                            Welcome {user.username}
                        </div>
                        <Button
                            url="/objects/create"
                            label="Create"
                        />
                    </Fragment>
                )}

                {!user && (
                    <Fragment>
                        <div className={styles.welcome}>
                            Welcome
                        </div>
                        <Button
                            url="/login"
                            label="Sign in"
                        />
                    </Fragment>
                )}
            </div>
        );
    }
}

export default Hero;