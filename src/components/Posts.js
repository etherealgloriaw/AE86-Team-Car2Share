import React, { useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { Grid } from "@material-ui/core";
import { Post } from "./Post";


export const Posts = () => {
    const posts = useSelector((state) => state.posts)
    const renderedPosts = posts.map((slice) => (
        <Grid item xs={12} md={6} key={Math.random()}>
          {
            <Post name = {slice.name} startingTime = {slice.startingTime} from = {slice.from}
            to = {slice.to}/>
          }
        </Grid>
    ))

    return (
        <section className="posts">
            {renderedPosts}
        </section>
    )

}


export default Posts;
