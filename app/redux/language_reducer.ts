import { SET_LANGUAGE } from "./actions";

const initialLanguageState = {
  language: "en",
};

function setLanguageReducer(state = initialLanguageState, action) {
  switch (action.type) {
    case SET_LANGUAGE:
      console.log("setLanguageReducer:", action.payload);
      return { ...state, language: action.payload };
    default:
      return state;
  }
}

export default setLanguageReducer;
