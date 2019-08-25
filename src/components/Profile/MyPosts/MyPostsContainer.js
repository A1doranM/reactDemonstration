import {addPostActionCreator, updatePostTextActionCreator} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.postsData,
        newPostText: state.profilePage.newPostText,
    }
};

const MyPostsContainer = connect(mapStateToProps, {
    addPost: addPostActionCreator,
    updatePostText: updatePostTextActionCreator,
})(MyPosts);

export default MyPostsContainer;