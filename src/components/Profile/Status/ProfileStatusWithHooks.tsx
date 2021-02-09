import React, {ChangeEvent, useEffect, useState} from 'react';

type PropsType = {
    status: string,
    updateStatus: (status: string) => void
}

const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {
    let [editMode, setEditMode] = useState<boolean>(false);
    let [status, setStatus] = useState<string>(props.status);

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

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value);
    };

    return (
        <div>
            {!editMode
                ?
                <div>
                    <b>Status: </b><span onDoubleClick={activateEditMode}>{props.status || '----------'}</span>
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

export default ProfileStatusWithHooks;