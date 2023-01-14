import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";
import { Container, Grid, Grow } from "@mui/material";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";

const Home = () => {
    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState(0);
  
    useEffect(() => {
      dispatch(getPosts());
    }, [dispatch]);
  return (
    <Grow in>
      <Container>
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
          className="flexDirection"
        >
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={5}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
