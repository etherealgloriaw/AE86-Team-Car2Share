import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux'
import { Grid, List } from "@material-ui/core";
import { Post } from "./Post";
import './style/posts.css'
import {getPostAsync} from "../redux/posts/thunks";


export const Posts = (props) => {
    const posts = useSelector(state => state.posts.list)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPostAsync());
    }, [dispatch]);

    console.log(posts);
    const renderedPosts = posts.map((slice) => {
        const date = new Date(slice.startingTime)
        const dateString = date.toDateString() + " " +date.getHours()+ ":"
            + ((date.getMinutes() > 9)? date.getMinutes(): ("0" + date.getMinutes()))+ ":" +
            ((date.getSeconds() > 9)? date.getSeconds(): ("0" + date.getSeconds()))
        return(
        <Grid item xs={12} md={12} key={Math.random()}>
          {
            <Post name = {slice.driver} startingTime = {dateString} from = {slice.from}
            to = {slice.to} contactInfo={slice.contactInfo} key={Math.random()} id={slice._id}
                  active={slice.active} rating={slice.rating} price={slice.price}
                  availableSeats={slice.availableSeats} selected={props.selected} setSelected={props.setSelected}
                  setPopup={props.setPopup}/>
          }
        </Grid>

    )})

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
