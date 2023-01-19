import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
} from "@mui/material";
import moment from "moment";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deletePost, likePost } from "../../../actions/posts";

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const user = JSON.parse(localStorage.getItem("profile"));
  const [likes, setLikes] = useState(post?.likes);
  const userId = user?.result?.sub || user?.result?._id;

  const hasLikedPost = post?.likes?.find((like) => like === userId);

  const openPost = () => {
    history(`/posts/${post?._id}`);
  };

  const handleLike = async () => {
    dispatch(likePost(post?._id));

    if (hasLikedPost) {
      setLikes(post?.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post?.likes, userId]);
    }
  };

  const Likes = () => {
    if (likes?.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <ThumbUpIcon fontSize="small" />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpIcon fontSize="small" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpIcon fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: "15px",
        height: "100%",
        position: "relative",
      }}
      raised
      elevation={6}
    >
      <ButtonBase
        sx={{
          display: "block",
          textAlign: "initial",
        }}
        onClick={openPost}
      >
        <CardMedia
          sx={{
            height: 0,
            paddingTop: "56.25%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backgroundBlendMode: "darken",
          }}
          image={post?.selectedFile}
          title={post?.title}
        />
        <div
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            color: "white",
          }}
        >
          <Typography variant="h6">{post?.name}</Typography>
          <Typography variant="h6">
            {moment(post?.createdAt).fromNow()}
          </Typography>
        </div>

        {(user?.result?.sub === post?.creator ||
          user?.result?._id === post?.creator) && (
          <div
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              color: "white",
            }}
          >
            <Button
              sx={{ color: "white" }}
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentId(post?._id);
              }}
            >
              <MoreHorizIcon />
            </Button>
          </div>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "20px",
          }}
        >
          <Typography variant="body2" color="textSecondary">
            {post?.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography
          sx={{ padding: "0 16px" }}
          variant="h5"
          color="textSecondary"
          gutterBottom
        >
          {post?.title}
        </Typography>
        <CardContent>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            gutterBottom
          >
            {post.message.split(" ").splice(0, 20).join(" ")}...
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions
        sx={{
          padding: "0 16px 8px 16px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={handleLike}
        >
          <Likes />
        </Button>

        {(user?.result?.sub === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button
            size="small"
            color="primary"
            onClick={() => dispatch(deletePost(post?._id))}
          >
            <DeleteIcon fontSize="small" />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
