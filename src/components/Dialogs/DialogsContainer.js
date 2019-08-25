import {addMessageActionCreator, updateMessageTextActionCreator} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";

import {connect} from "react-redux/es/alternate-renderers";

let mapStateToProps = (state) =>{
    return {
        dialogsPage: state.dialogsPage,
    }
};


const DialogsContainer = connect(mapStateToProps, {
    newMessage: addMessageActionCreator,
    changeMessageText: updateMessageTextActionCreator,
})(Dialogs);

export default DialogsContainer;