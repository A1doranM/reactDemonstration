import React from 'react';
import styleFor from './MyPosts.module.css';

import Post from '../MyPosts/Post/Post';
import AddPostFormRedux from "../PostForm/AddPostForm";

let MyPosts = React.memo((props) => {
    let addPost = (values) => {
        props.addPost(values.newPostBody);
    };

    let postsElems = props.posts.map((post) => {
        return <Post key={post.id} message={post.text}/>
    });

    return (
        <div className={styleFor.postsBlock}><h2>My posts</h2>
            <AddPostFormRedux onSubmit={addPost}/>
            <div className={styleFor.posts}>
                {postsElems}
            </div>
        </div>
    )
});

export default MyPosts;