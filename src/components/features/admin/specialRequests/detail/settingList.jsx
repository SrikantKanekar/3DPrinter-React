import React, {Fragment} from 'react';

function SettingList(props) {
    return (
        <Fragment>
            {Object.entries(props.setting).map(([key, value]) =>
                <div key={key}>
                    {key} : {value.toString()}
                </div>
            )}
        </Fragment>
    );
}

export default SettingList;