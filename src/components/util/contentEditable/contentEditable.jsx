import React, {Component} from 'react';
import styles from "./contentEditable.module.css"

class ContentEditable extends Component {

    constructor(props) {
        super(props);
        this.editable = React.createRef()
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.html !== this.editable.current.innerHTML
    }

    emitChange = () => {
        const html = this.editable.current.innerHTML
        if (this.props.onChange && html !== this.lastHtml) {
            this.props.onChange({
                target: {
                    value: html
                }
            })
        }
        this.lastHtml = html;
    }

    render() {
        return (
            <div
                ref={this.editable}
                className={styles.content}
                onInput={this.emitChange}
                onBlur={this.emitChange}
                contentEditable
                dangerouslySetInnerHTML={{__html: this.props.html}}/>
        );
    }
}

export default ContentEditable;