import {actions} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.postsData,
        newPostText: state.profilePage.newPostText,
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        addPost: (newPostBody) => {
            dispatch(actions.addPostActionCreator(newPostBody));
        }
    }
};

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;