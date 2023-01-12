import React, { useState, useEffect } from "react";
import { Button, Typography, Paper } from "@mui/material";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import { useSelector } from "react-redux";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const Form = ({ currentId, setCurrentId }) => {
  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(updatePost(currentId, postData));
    } else {
      dispatch(createPost(postData));
    }
    clear();
  };
  const clear = () => {
    setCurrentId(null);
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };
  return (
    <Paper sx={{ padding: "20px" }}>
      <ValidatorForm
        autoComplete="off"
        noValidate
        sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {" "}
          {currentId ? "Editing" : "Creating"} a Memory
        </Typography>
        <TextValidator
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
          validators={["required"]}
          errorMessages={["this field is required"]}
          sx={{ paddingBottom: "10px", marginTop: "15px" }}
        />
        <TextValidator
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
          validators={["required"]}
          errorMessages={["this field is required"]}
          sx={{ paddingBottom: "10px" }}
        />
        <TextValidator
          name="message"
          variant="outlined"
          label="Message"
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
          validators={["required"]}
          errorMessages={["this field is required"]}
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
