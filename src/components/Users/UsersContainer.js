import {connect} from "react-redux";
import Users from "./Users";
import {followActionCreator, setUserActionCreator, unfollowActionCreator} from "../../redux/usersReducer";

let mapStateToProps = (state) =>{
    return {
        users: state.usersPage.usersData,
    }
};

let mapDispatchToProps = (dispatch) =>{
    return {
        follow: (userID) => {
            dispatch(followActionCreator(userID));
        },
        unfollow: (userID) => {
            dispatch(unfollowActionCreator(userID));
        },
        setUsers: (users) => {
            dispatch(setUserActionCreator(users));
        }
    }
};

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default UsersContainer;