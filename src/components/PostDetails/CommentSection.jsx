import React, { useState, useRef } from "react";
import { Typography, TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { commentPost } from "../../actions/posts";

const CommentSection = ({ post }) => {
  const dispatch = useDispatch();
  const [comments, setComments] = useState([post?.comments]);
  const [comment, setComment] = useState("");
  const user = JSON.parse(localStorage.getItem("profile"));
  const commentsRef = useRef();

  const handleClick = async () => {
    const finalComment = `${user?.result?.name}: ${comment}`;

    const newComments = await dispatch(commentPost(finalComment, post._id));

    setComment("");
    setComments(newComments);

    commentsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          style={{ height: "200px", overflowY: "auto", marginRight: "30px" }}
        >
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {comments?.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              <strong>{String(c).split(": ")[0]}</strong>
              {String(c).split(":")[1]}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>
        {user?.result?.name && (
          <div style={{ width: "70%" }}>
            <Typography gutterBottom variant="h6">
              Write a comment
            </Typography>
            <TextField
              fullWidth
              rows={4}
              variant="outlined"
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              sx={{ marginTop: "10px" }}
              fullWidth
              disabled={!comment}
              variant="contained"
              color="primary"
              onClick={handleClick}
            >
              Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
