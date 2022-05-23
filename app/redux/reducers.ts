// import { SAVE_USER } from "./actions";

// const initialUserState = {
//   userName: "",
//   userEmail: "",
//   userPicture: "",
// };

// function userReducer(state = initialUserState, action) {
//   switch (action.type) {
//     case SAVE_USER:
//       return { ...state, userName: action.payload.attributes };
//     default:
//       return state;
//   }
// }

// export default userReducer;

import { SAVE_USER, SIGN_IN } from "./actions";

const initialState = {
  userInfo: "Tom cat",
};

// const initialLanguageState = {
//   language: "en",
// };

function saveUserReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_USER:
      console.log("actionReducer:", action.payload);
      return { ...state, userInfo: action.payload };
    case SIGN_IN:
      return { ...state, userInfo: action.payload };
    default:
      return state;
  }
}

// function setLanguageReducer(state = initialLanguageState, action) {
//   switch (action.type) {
//     case SET_LANGUAGE:
//       console.log("setLanguageReducer:", action.payload);
//       return { ...state, language: action.payload };
//     default:
//       return state;
//   }
// }

export default saveUserReducer;
