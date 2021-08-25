import React, {Component} from 'react';
import {findDOMNode} from 'react-dom'
import styles from "./contentEditable.module.css"

class ContentEditable extends Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.html !== findDOMNode(this).innerHTML
    }

    emitChange = () => {
        const html = findDOMNode(this).innerHTML
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
                className={styles.content}
                onInput={this.emitChange}
                onBlur={this.emitChange}
                contentEditable
                dangerouslySetInnerHTML={{__html: this.props.html}}/>
        );
    }
}

export default ContentEditable;