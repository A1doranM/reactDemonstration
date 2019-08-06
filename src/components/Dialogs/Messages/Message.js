import React from 'react';
import styleFor from './Message.module.css';

const Message = (props) => {
    return (
        <div className={styleFor.message}>
            {props.message}
        </div>
    )
};

export default Message;