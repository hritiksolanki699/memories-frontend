import axios from "axios";

const url = "https://memories-backend-seven.vercel.app/posts";

// const url = "http://localhost:5000/posts" || "https://memories-backend-seven.vercel.app/posts";

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const updatePost = (id, updatePost) =>
  axios.patch(`${url}/${id}`, updatePost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`)