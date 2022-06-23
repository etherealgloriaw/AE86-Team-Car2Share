import React, { useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { Grid } from "@material-ui/core";
import { Post } from "./Post";
import './style/posts.css'


export const Posts = () => {
    const posts = useSelector((state) => state.posts)

    const renderedPosts = posts.map((slice) => (
        <Grid item xs={12} md={12}>
          {
            <Post name = {slice.name} startingTime = {slice.startingTime} from = {slice.from}
            to = {slice.to} />
          }
        </Grid>
    ))

    return (
        <section className="posts">
            <Grid container spacing={2}>
                {renderedPosts}
            </Grid>
        </section>
    )

}


export default Posts;
