import { Paper, Typography, CircularProgress, Divider } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";

// import { getPost } from "../../actions/posts";

const PostDetails = () => {
//   const { post, posts, isLoading } = useSelector((state) => state.posts);
//   const dispatch = useDispatch();
//   const history = useNavigate();
//   const { id } = useParams();

//   useEffect(() => {
//     dispatch(getPost(id));
//   }, [id]);

  return (
    <Paper sx={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      {/* <div style={{ display: "flex", width: "100%" }}>
        <div style={{ borderRadius: "20px", margin: "10px", flex: 1 }}>
          <Typography variant="h3" component="h2">
            {post.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">
            {moment(post.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="body1">
            <strong>Realtime Chat - coming soon!</strong>
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="body1">
            <strong>Comments - coming soon!</strong>
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <div style={{ marginLeft: "20px" }}>
          <img
            style={{
              borderRadius: "20px",
              objectFit: "cover",
              width: "100%",
              maxHeight: "600px",
            }}
            src={
              post.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt={post.title}
          />
        </div>
      </div> */}
      <div>postDetails</div>
    </Paper>
  );
};

export default PostDetails;
