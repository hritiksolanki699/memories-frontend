import * as api from "../api";
import { AUTH } from "../constants/actionTypes";

export const signIn = (formData, history) => async (dispatch) => {
  try {
    //  login the user..
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    history("/");
  } catch (error) {
    alert(error.response.data.message)
    console.log(error.response.data.message);
  }
};

export const signUp = (formData, history) => async (dispatch) => {
  try {
    //   SignUp the user..
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    history("/");
  } catch (error) {
    alert(error.response.data.message)
    console.log(error);
  }
};
