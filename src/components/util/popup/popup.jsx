import React, {Component, Fragment} from 'react';
import styles from "./popup.module.css"

class Popup extends Component {
    render() {
        const {isOpen, execute, close} = this.props

        return (
            <Fragment>
                {isOpen && (
                    <div>
                        <div className={styles.overlay} onClick={close}/>

                        <div className={styles.popup}>
                            <i className="fa fa-close" onClick={close}/>

                            <div className={styles.content}>
                                <div className={styles.title}>Slicing error</div>
                                <div className={styles.text}>
                                    An error occurred during slicing. Consider sending us this model.
                                    Our engineering team will Slice the model and let you know when it's done
                                </div>
                            </div>
                            <div className={styles.buttons}>
                                <button onClick={execute}>Send</button>
                                <button onClick={close}>Try different model</button>
                            </div>
                        </div>
                    </div>
                )}
            </Fragment>
        );
    }
}

export default Popup;