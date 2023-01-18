import React, { useState, useEffect } from "react";
import { Button, Typography, Paper } from "@mui/material";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import { useSelector } from "react-redux";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { useNavigate } from 'react-router-dom'

const Form = ({ currentId, setCurrentId }) => {
  const history = useNavigate()
  const user = JSON.parse(localStorage.getItem("profile"));
  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((p) => p._id === currentId) : null
  );

  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(
        createPost({
          ...postData,
          name: user?.result?.name,
          creator: user?.result?._id ? user?.result?._id : user?.result?.sub,
        }, history)
      );
    } else {
      dispatch(updatePost({ ...postData, name: user?.result?.name }));
    }
    clear();
  };

  if (!user?.result?.name) {
    return (
      <Paper sx={{ padding: "20px" }}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ padding: "20px", borderRadius: 4 }} elevation={5}>
      <ValidatorForm
        autoComplete="off"
        sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6" sx={{textAlign:"center", paddingBottom:"8px"}}>
          {" "}
          {currentId ? "Editing" : "Creating"} a Memory
        </Typography>
        <TextValidator
          name="title"
          variant="outlined"
          label="Title"
          required
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
          sx={{ paddingBottom: "10px" }}
        />
        <TextValidator
          multiline
          rows={3}
          name="message"
          variant="outlined"
          label="Message"
          required
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
          validators={["required"]}
          errorMessages={["this field is required"]}
          sx={{ paddingBottom: "10px" }}
        />
        <TextValidator
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
          sx={{ paddingBottom: "10px" }}
        />
        <div
          style={{
            width: "97%",
            margin: "10px 0",
          }}
        >
          <FileBase
            type="file"
            required={true}
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
          sx={{ marginBottom: "10px", marginTop: "10px" }}
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
          sx={{ marginTop: "10px" }}
        >
          Clear
        </Button>
      </ValidatorForm>
    </Paper>
  );
};

export default Form;
