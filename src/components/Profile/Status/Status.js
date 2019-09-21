import React, {useEffect, useState} from 'react';

const Status = (props) => {
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    const activateEditMode = () => {
        setEditMode(true);
    };

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status)
    };

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    };

    return (
        <div>
            {!editMode
                ?
                <div>
                    <span onDoubleClick={activateEditMode}>{props.status || '----'}</span>
                </div>
                :
                <div>
                    <input autoFocus={true}
                           value={status}
                           onBlur={deactivateEditMode}
                           onChange={onStatusChange}/>
                </div>
            }
        </div>
    )
};

export default Status;