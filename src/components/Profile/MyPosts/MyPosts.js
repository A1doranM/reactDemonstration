import React from 'react';
import styleFor from './MyPosts.module.css';

import Post from '../MyPosts/Post/Post';

const MyPosts = (props) => {
    let addPost = () => {
        props.addPost();
    };

    let updatePostText = (e) =>{
        let text = e.target.value;
        props.updatePostText(text);
    };

    let postsElems = props.posts.map((post) => {
        return <Post message={post.text}/>
    });

    return (
        <div className={styleFor.postsBlock}><h2>My posts</h2>
            <div>
                <div>
                    <textarea onChange={updatePostText}
                              value={props.newPostText.text}/>
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