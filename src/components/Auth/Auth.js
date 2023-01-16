import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ValidatorForm } from "react-material-ui-form-validator";
import Input from "./Input";
import Icons from "./Icons";
import { LoginSocialGoogle } from "reactjs-social-login";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AUTH } from "../../constants/actionTypes";
import { signIn, signUp } from "../../actions/auth";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const Id = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const history = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      dispatch(signUp(formData, history));
    } else {
      dispatch(signIn(formData, history));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () =>
    setShowPassword((preShowPassword) => !preShowPassword);

  const switchMode = () => {
    setIsSignUp(!isSignUp);
    setShowPassword(false);
  };

  const googleSuccess = async (res) => {
    const result = res?.data;
    const token = res?.data?.access_token;
    try {
      dispatch({ type: AUTH, data: { result, token } });
      history("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = () =>
    alert("Google Sign In was unsuccessful. Try again later");

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
        }}
        elevation={3}
      >
        <Avatar sx={{ backgroundColor: "#AB1694" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5" sx={{ mt: 2 }}>
          {isSignUp ? "Sign Up" : "Sign In"}
        </Typography>
        <ValidatorForm
          style={{ marginTop: "26px", width: "100%" }}
          onSubmit={handleSubmit}
        >
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />

                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="Email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Confirm Password"
                handleChange={handleChange}
                type={"password"}
                handleShowPassword={handleShowPassword}
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          <LoginSocialGoogle
            client_id={Id}
            scope="openid profile email"
            discoveryDocs="claims_supported"
            access_type="offline"
            onResolve={googleSuccess}
            onReject={googleError}
          >
            <Button
              sx={{ marginTop: "12px" }}
              color="primary"
              fullWidth
              startIcon={<Icons />}
              variant="contained"
            >
              Google Sign In
            </Button>
          </LoginSocialGoogle>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </ValidatorForm>
      </Paper>
    </Container>
  );
};

export default Auth;
