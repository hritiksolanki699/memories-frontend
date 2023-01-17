import React from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@mui/material";

const Posts = ({setCurrentId}) => {
  const posts = useSelector((state) => state.posts);

  return !posts.length ? <CircularProgress /> 
  : 
  <Grid 
  sx={{ display: 'flex',
  alignItems: 'center'}}
  container
  alignItems="stretch" 
  spacing={3}
  >
  {
    posts.map((post) =>(
      <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
         <Post post={post} setCurrentId={setCurrentId} />
      </Grid>
    ))
  }
  </Grid>;
};

export default Posts;
