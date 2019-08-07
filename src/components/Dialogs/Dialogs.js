import React from 'react';
import styleFor from './Dialogs.module.css';

import Dialog from "./Dialog/Dialog";
import Message from "./Messages/Message";

const Dialogs = (props) => {

    let dialogElems = props.dataUsers.map((dialog) => {
        return <Dialog name={dialog.name} id={dialog.id}/>
    });

    let messagesElems = props.dataMessages.map((message) => {
        return <Message message={message.message}/>
    });

    return (
        <div className={styleFor.dialogs}>
            <div className={styleFor.dialogItems}>
                {dialogElems}
            </div>
            <div className={styleFor.messages}>
                {messagesElems}
            </div>
        </div>
    )
};

export default Dialogs;