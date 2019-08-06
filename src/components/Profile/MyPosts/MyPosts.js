import React from 'react';
import styleFor from './MyPosts.module.css';

import Post from '../MyPosts/Post/Post';

const MyPosts = (props) => {
    return (
        <div className={styleFor.postsBlock}> <h2>My posts</h2>
            <div>
                <div>
                    <textarea>
                        Write post text
                    </textarea>
                </div>
                <div>
                    <button>
                        Add post
                    </button>
                </div>
            </div>
            <div className={styleFor.posts}>
                <Post message='Hi people'/>
                <Post message='Hi, this is my first post!'/>
            </div>
        </div>
    )
};

export default MyPosts;