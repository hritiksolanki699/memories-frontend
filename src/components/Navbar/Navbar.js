import {
  AppBar,
  Avatar,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import memories from "../../images/memories.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = null;

  return (
    <AppBar
      position="static"
      color="inherit"
      sx={{
        borderRadius: 15,
        margin: "30px 0",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography
          component={Link}
          to="/"
          variant="h4"
          align="center"
          sx={{ color: "rgba(0,183,255, 1)", textDecoration: "none" }}
          className="title"
        >
          Memories
        </Typography>
        <img
          src={memories}
          alt="memories"
          height="60"
          width="60"
          style={{ marginLeft: "12px", padding: "8px 0" }}
          className="memories"
        />
      </Container>
      <Toolbar
        sx={{ display: "flex", justifyContent: "flex-end", width: "400px" }}
      >
        {user ? (
          <Container
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "400px",
            }}
          >
            <Avatar sx={{}} alt="" src="">
              user
            </Avatar>
            <Typography
              sx={{ display: "flex", alignItems: "center" }}
              variant="h6"
            >
              userName
            </Typography>
            <Button variant="contained" color="secondary">
              Logout
            </Button>
          </Container>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
