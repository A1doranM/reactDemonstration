import {actions} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";

import {connect} from "react-redux";
import {withAuthRedirect} from "../../HOC/withAuthRedirect";
import {compose} from "redux";

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        newMessage: (newMessageBody) => {
            dispatch(actions.addMessageActionCreator(newMessageBody));
        },
    }

};

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, mapDispatchToProps)
)(Dialogs);
