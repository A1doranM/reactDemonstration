import {addPostActionCreator, updatePostTextActionCreator} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

let mapStateToProps = (state) =>{
    return {
        posts: state.profilePage.postsData,
        newPostText: state.profilePage.newPostText,
    }
};

let mapDispatchToProps = (dispatch) =>{
    return {
        addPost: () => {
            dispatch(addPostActionCreator());
        },
        updatePostText: (text) => {
            dispatch(updatePostTextActionCreator(text));
        }
    }
};

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;