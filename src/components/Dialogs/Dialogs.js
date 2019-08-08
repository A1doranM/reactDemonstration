import React from 'react';
import styleFor from './Dialogs.module.css';

import Dialog from "./Dialog/Dialog";
import Message from "./Messages/Message";

const Dialogs = (props) => {

    let messageText = React.createRef();

    let newMessage = () => {
        let text = messageText.current.value;
        props.addMessage(text);
    };

    let dialogElems = props.dialogs.dataUsers.map((dialog) => {
        return <Dialog name={dialog.name} id={dialog.id}/>
    });

    let messagesElems = props.dialogs.dataMessages.map((message) => {
        return <Message message={message.message}/>
    });

    return (
        <div className={styleFor.dialogs}>
            <div className={styleFor.dialogItems}>
                {dialogElems}
            </div>
            <div className={styleFor.messages}>
                <div>
                    <textarea ref={messageText}></textarea>
                    <button onClick={newMessage}>
                        send
                    </button>
                </div>
                {messagesElems}
            </div>
        </div>
    )
};

export default Dialogs;