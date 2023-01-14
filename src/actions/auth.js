import * as api from "../api";
import { AUTH } from "../constants/actionTypes";

export const signIn = (formData, history) => async (dispatch) => {
  try {
    //  login the user..
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    history("/");
  } catch (error) {
    console.log(error);
  }
};

export const signUp = (formData, history) => async (dispatch) => {
  try {
    //   SignUp the user..
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });
    
    history("/");
  } catch (error) {
    console.log(error);
  }
};
