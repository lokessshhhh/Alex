import { Auth, Hub } from "aws-amplify";

// Define action types
export const SAVE_USER = "SAVE_USER";
export const SIGN_IN = "SIGN_IN";
export const SET_LANGUAGE = "SET_LANGUAGE";

export const signIn = () => {
  try {
    return async (dispatch) => {
      Auth.currentAuthenticatedUser().then((data) => {
        console.log("userdata:", data);
        dispatch({
          type: SIGN_IN,
          payload: data.attributes,
        });
      });
    };
  } catch (error) {
    // Add custom logic to handle errors
    console.log(error);
  }
};

export const setLanguage = (language) => {
  console.log(language);
  try {
    return async (dispatch) => {
      dispatch({
        type: SET_LANGUAGE,
        payload: language,
      });
    };
  } catch (error) {
    // Add custom logic to handle errors
    console.log(error);
  }
};
