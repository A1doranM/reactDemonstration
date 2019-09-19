import React, {useState} from 'react';

const StatusWithHooks = (props) => {
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

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

export default StatusWithHooks;