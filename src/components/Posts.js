import React, { useState } from "react";
import './style/myStyle.css'
import {useDispatch, useSelector} from 'react-redux'

 const Posts = () => {

        return(
        <div className="">
            <PostsList className="posts"> </PostsList>
        </div>
        )
}

export const PostsList = () => {
    const posts = useSelector((state) => state.posts)

    const renderedPosts = posts.map((slice) => (
        <div className="post" key={slice.id}>
            <p className="post-title" >{slice.name}</p>
            <p className="post-rating">Rating: {slice.rating}</p>
            <p className="post-detail">From: {slice.from}</p>
            <p className="post-detail" >To: {slice.to}</p>
            <p className="post-detail" >Starting Time: {slice.startingTime}</p>
            <p className="post-detail" >Total Time: {slice.totalTime}</p>
        </div>
    ))

    return (
        <section className="posts">
            {renderedPosts}
        </section>
    )

}


export default Posts;
