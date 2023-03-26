import React, {FC, useState} from 'react';
import Post from "./Post/Post";
import styles from './Posts.module.scss'
import {IPost} from "../../../types/post.types";

const Posts:FC<{posts: IPost[]}> = ({posts}) => {
    if (!posts.length){
        return <div>Заметок нет</div>
    }
    return (
        <div className={styles.posts}>
            {posts?.map(post => <Post key={post.id} post={post}/>)}
        </div>
    );
};

export default Posts;