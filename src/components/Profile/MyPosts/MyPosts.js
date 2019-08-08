import React from 'react';
import styleFor from './MyPosts.module.css';

import Post from '../MyPosts/Post/Post';

const MyPosts = (props) => {

    let newPost = React.createRef();

    let addPost = () => {
      let text = newPost.current.value;
      props.addPost(text);
    };

    let postsElems = props.posts.postsData.map((post) => {
        return <Post message={post.text}/>
    });

    return (
        <div className={styleFor.postsBlock}> <h2>My posts</h2>
            <div>
                <div>
                    <textarea ref={newPost}></textarea>
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