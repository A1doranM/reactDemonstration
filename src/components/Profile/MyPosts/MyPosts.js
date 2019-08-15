import React from 'react';
import styleFor from './MyPosts.module.css';

import Post from '../MyPosts/Post/Post';
import {addPostActionCreator, updatePostTextActionCreator} from "../../../redux/profileReducer";

const MyPosts = (props) => {
    let addPost = () => {
        let action = addPostActionCreator();
        props.dispatch(action);
    };

    let changeNewPostText = (e) =>{
        let text = e.target.value;
        let action = updatePostTextActionCreator(text);
        props.dispatch(action);
    };

    let postsElems = props.posts.postsData.map((post) => {
        return <Post message={post.text}/>
    });

    return (
        <div className={styleFor.postsBlock}><h2>My posts</h2>
            <div>
                <div>
                    <textarea onChange={changeNewPostText}
                              value={props.posts.newPostText.text}/>
                </div>
                <div>
                    <button onClick={addPost}>
                        Add post
                    </button>
                </div>
            </div>
            <div className={styleFor.posts}>
                {postsElems}
            </div>
        </div>
    )
};

export default MyPosts;