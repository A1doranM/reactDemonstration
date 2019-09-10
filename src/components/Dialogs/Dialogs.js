import React from 'react';
import styleFor from './Dialogs.module.css';

import Dialog from "./Dialog/Dialog";
import Message from "./Messages/Message";
import {Redirect} from "react-router-dom";
import AddMessageFormRedux from "./DialogForm/AddMessageForm";

const Dialogs = (props) => {
    let dialogElems = props.dialogsPage.dataUsers.map((dialog) => {
        return <Dialog key={dialog.id} name={dialog.name} id={dialog.id}/>
    });

    let messagesElems = props.dialogsPage.dataMessages.map((message) => {
        return <Message key={message.id} message={message.message}/>
    });

    let addNewMessage = (values) => {
        props.newMessage(values.newMessageBody);
    };

    if(!props.isAuth){
       return <Redirect to={'/login'}/>
    }

    return (
        <div className={styleFor.dialogs}>
            <div className={styleFor.dialogItems}>
                {dialogElems}
            </div>
            <div className={styleFor.messages}>
                <AddMessageFormRedux onSubmit={addNewMessage} />
                <div>
                    {messagesElems}
                </div>
            </div>
        </div>
    )
};

export default Dialogs;