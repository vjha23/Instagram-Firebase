import React, { useState, useEffect } from 'react'
import './Post.css'
import Avatar from '@material-ui/core/Avatar'
import { db } from './firebase'
import { Button } from '@material-ui/core';
import firebase from 'firebase';

function Post({ username, caption, imgUrl, postId, user }) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");

    console.log(postId);


    useEffect(() => {
        let unsubscribe;
        if (postId) {
            unsubscribe = db
                .collection("posts")
                .doc(postId)
                .collection("comments")
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => doc.data()));
                });
        }

        return () => {
            unsubscribe();
        };
    }, [postId]);
    const postComment = (event) => {
        event.preventDefault();
        db.collection("posts").doc(postId).collection("comments").add({
            text: comment,
            username: user.displayName,

        })
        setComment('')

    }
    return (
        <div className='post'>
            {/* header -> avatar+username */}
            <div className='post__header'>
                <Avatar
                    className='post__avatar'
                    alt='Vijayjha'
                    src=''
                />
                <h3>{username}</h3>
            </div>
            { /* image */}
            <img className='post__image' src={imgUrl} />
            {/* username + caption */}
            <h4 className='post__text'><strong>{username}</strong> {caption}</h4>


            <div className="post__comments">
                {comments.map((comment) => {
                    return (
                        <p>
                            <strong>{comment.username}</strong> {comment.text}
                        </p>
                    )
                })}
            </div>

            {user && (
                <form className='post__commentBox' >
                    <input className='post__input'
                        type='text'
                        placeholder='Add a Comment'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}

                    />
                    <Button
                        disabled={!comment}
                        className='post__button'
                        type="submit"
                        onClick={postComment}
                    >Post</Button>
                </form>
            )

            }

        </div>
    )
}

export default Post
