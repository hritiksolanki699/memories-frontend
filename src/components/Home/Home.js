import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPosts, getPostsBySearch } from "../../actions/posts";
import {
  Container,
  Grow,
  Grid,
  AppBar,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { MuiChipsInput } from "mui-chips-input";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import PaginationCompoent from "../Pagination";
import App from "../../App";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(0);
  const query = useQuery();
  const history = useNavigate();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, currentId]);

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      history(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      history("/");
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      //search post
    }
  };

  const handleAdd = (tag) => setTags([...tags, tag]);

  const handleDelete = (tagToDelete) =>
    setTags(tags.filter((tag) => tag !== tagToDelete));

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
          className="flexDirection"
        >
          <Grid item xs={12} sm={8}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <AppBar
              sx={{
                borderRadius: 4,
                marginBottom: "1rem",
                display: "flex",
                padding: "16px",
              }}
              position="static"
              color="inherit"
              elevation={5}
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                onKeyPress={handleKeyPress}
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <MuiChipsInput
                sx={{ margin: "10px 0" }}
                value={tags}
                onAddChip={handleAdd}
                onDeleteChip={handleDelete}
                label="Search Tags"
                variant="outlined"
              />
              <Button onClick={searchPost} variant="contained" color="primary">
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper
              sx={{
                borderRadius: 4,
                marginTop: "1rem",
                padding: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              elevation={5}
            >
              <PaginationCompoent />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
