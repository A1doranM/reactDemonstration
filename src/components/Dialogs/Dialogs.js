import React from 'react';
import styleFor from './Dialogs.module.css';

import Dialog from "./Dialog/Dialog";
import Message from "./Messages/Message";
import {addMessageActionCreator, updateMessageTextActionCreator} from "../../redux/dialogsReducer";

const Dialogs = (props) => {
    let dialogElems = props.dialogs.dataUsers.map((dialog) => {
        return <Dialog name={dialog.name} id={dialog.id}/>
    });

    let messagesElems = props.dialogs.dataMessages.map((message, index) => {
        return <Message key={index} message={message.message}/>
    });

    let newMessage = () => {
        let action = addMessageActionCreator();
        props.dispatch(action);
    };

    let changeMessageText = (e) =>{
        let text = e.target.value;
        let action = updateMessageTextActionCreator(text);
        props.dispatch(action);
    };

    return (
        <div className={styleFor.dialogs}>
            <div className={styleFor.dialogItems}>
                {dialogElems}
            </div>
            <div className={styleFor.messages}>
                <div>
                    <textarea onChange={changeMessageText}
                              value={props.dialogs.newMessageText.text}/>

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