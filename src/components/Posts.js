import React, { useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { Grid, List } from "@material-ui/core";
import { Post } from "./Post";
import './style/posts.css'


export const Posts = () => {
    const posts = useSelector((state) => state.posts)

    const renderedPosts = posts.map((slice) => (
        <Grid item xs={12} md={12} key={Math.random()}>
          {
            <Post name = {slice.name} startingTime = {slice.startingTime} from = {slice.from}
            to = {slice.to} contactInfo={slice.contactInfo} key={Math.random()} id={slice.id}/>
          }
        </Grid>
        
    ))

    return (
        <section className="posts">
            <List style={{maxHeight: '250%', overflow: 'auto'}}>
            {/* <Grid sx={{ overflowY: "scroll", maxHeight: "250px" }}, container spacing={2}> */}
                {renderedPosts}
            {/* </Grid> */}
            </List>
        </section>
    )

}


export default Posts;
