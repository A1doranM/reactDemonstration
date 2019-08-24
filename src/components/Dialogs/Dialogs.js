import React from 'react';
import styleFor from './Dialogs.module.css';

import Dialog from "./Dialog/Dialog";
import Message from "./Messages/Message";

const Dialogs = (props) => {
    let dialogElems = props.dialogsPage.dataUsers.map((dialog) => {
        return <Dialog key={dialog.id} name={dialog.name} id={dialog.id}/>
    });

    let messagesElems = props.dialogsPage.dataMessages.map((message) => {
        return <Message key={message.id} message={message.message}/>
    });

    let newMessage = () => {
        props.newMessage();
    };

    let changeMessageText = (e) =>{
        let text = e.target.value;
        props.changeMessageText(text);
    };

    return (
        <div className={styleFor.dialogs}>
            <div className={styleFor.dialogItems}>
                {dialogElems}
            </div>
            <div className={styleFor.messages}>
                <div>
                    <textarea onChange={changeMessageText}
                              value={props.dialogsPage.newMessageText.text}/>

                    <button onClick={newMessage}>
                        send
                    </button>

                </div>
                <div>
                    {messagesElems}
                </div>
            </div>
        </div>
    )
};

export default Dialogs;