import React from 'react';

function ProgressBar(props) {
    return (
        <div
            className="progress-bar"
            role="progressbar"
            aria-valuenow={props.progress}
            aria-valuemin="0"
            aria-valuemax="100"
            style={{width: props.progress + "%"}}/>
    );
}

export default ProgressBar;