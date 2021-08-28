import React, {Component} from 'react';
import styles from "./selectableCard.module.css"

class SelectableCard extends Component {
    render() {
        const {title, description, selected, tooltip} = this.props;
        const className = `${styles.selectable} ${selected ? styles.selected : ""}`

        return (
            <div className={styles.card} data-tip={tooltip}>
                <div className={className} onClick={this.props.onClick}>
                    <div className={styles.content}>
                        <div className={styles.title}>{title}</div>
                        <div className={styles.description}><i className="fa fa-inr"/>{description}</div>
                    </div>
                    <div className={styles.check}><span className={styles.checkmark}>✔</span></div>
                </div>
            </div>
        )
    }
}

export default SelectableCard;