import { useState, useEffect } from "react";
import {
  AppBar,
  Avatar,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import memoriesLogo from "../../images/memories-Logo.png";
import memoriesText from "../../images/memories-Text.png";
import jwt_decode from "jwt-decode";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as actionType from "../../constants/actionTypes";

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const history = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history("/auth");

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;
    if (user?.expires_in) {
      if (token) {
        const decodedToken = jwt_decode(token);

        if (decodedToken.exp * 1000 < new Date().getTime()) logout();
      }
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

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
        <Link to="/" style={{ display: "flex", alignItems: "center" }}>
          <img src={memoriesText} alt="icon" height="40" />
          <img
            src={memoriesLogo}
            alt="memories"
            height="40"
            style={{ marginLeft: "12px", padding: "8px 0" }}
            className="memories"
          />
        </Link>
      </Container>
      <Toolbar
        sx={{ display: "flex", justifyContent: "flex-end", width: "400px" }}
      >
        {user?.result ? (
          <Container
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "400px",
            }}
          >
            <Avatar
              sx={{ background: "#9c27b0" }}
              alt={user?.result.name}
              src={user?.result.picture}
            >
              {user?.result.name.charAt(0)}
            </Avatar>
            <Typography
              sx={{ display: "flex", alignItems: "center" }}
              variant="h6"
            >
              {user?.result?.name}
            </Typography>
            <Button variant="contained" color="secondary" onClick={logout}>
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
