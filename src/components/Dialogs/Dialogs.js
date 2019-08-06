import React from 'react';
import styleFor from './Dialogs.module.css';

import Dialog from "./Dialog/Dialog";
import Message from "./Messages/Message";

const Dialogs = (props) => {

    let dataUsers = [
        {id: 1, name: 'Max'},
        {id: 2, name: 'Daria'},
        {id: 3, name: 'Alex'},
        {id: 4, name: 'Dimas'},
    ];

    let dataMessages = [
        {id: 1, message: 'Hi Max'},
        {id: 2, message: 'Hi Daria'},
        {id: 3, message: 'Hi Alex'},
        {id: 4, message: 'Hi Dimas'},
    ];

    let dialogElems = dataUsers.map((dialog) => {
        return <Dialog name={dialog.name} id={dialog.id}/>
    });

    let messagesElems = dataMessages.map((message) => {
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