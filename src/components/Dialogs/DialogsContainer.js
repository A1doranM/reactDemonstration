import {addMessageActionCreator, updateMessageTextActionCreator} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";

import {connect} from "react-redux/es/alternate-renderers";

let mapStateToProps = (state) =>{
    return {
        dialogsPage: state.dialogsPage,
    }
};

let mapDispatchToProps = (dispatch) =>{
    return{
        newMessage: () => {
            dispatch(addMessageActionCreator());
        },
        changeMessageText: (text) => {
            dispatch(updateMessageTextActionCreator(text));
        },
    }
};

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;