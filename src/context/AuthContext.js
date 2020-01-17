import { AsyncStorage } from "react-native";
import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signIn":
      return { errorMessage: "", token: action.payload };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "signOut":
      return { token: null, errorMessage: "" };
    default:
      return state;
  }
};

const tryLocalSignIn = dispatch => async () => {
  const token = await AsyncStorage.getItem("token");

  if (token) {
    dispatch({ type: "signIn", payload: token });
    navigate("TrackList");
  } else {
    navigate("SignUp");
  }
};

const clearErrorMessage = dispatch => () =>
  dispatch({ type: "clear_error_message" });

const signUp = dispatch => async ({ email, password }) => {
  try {
    const response = await trackerApi.post("/signup", { email, password });
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({ type: "signIn", payload: response.data.token });

    navigate("TrackList");
  } catch (err) {
    dispatch({ type: "add_error", payload: "Something went wrong" });
  }
};

const signIn = dispatch => async ({ email, password }) => {
  try {
    const response = await trackerApi.post("/signin", { email, password });
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({ type: "signIn", payload: response.data.token });
    navigate("TrackList");
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign in"
    });
  }
};

const signOut = dispatch => async () => {
  const token = await AsyncStorage.removeItem("token");
  dispatch({ type: "singOut" });
  navigate("loginFlow");
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signUp, signIn, clearErrorMessage, tryLocalSignIn, signOut },
  { token: null, errorMessage: "" }
);
