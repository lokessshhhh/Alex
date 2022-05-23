// import { configureStore, Action } from "@reduxjs/toolkit";
// import { ThunkAction } from "redux-thunk";
// import { persistReducer, persistStore } from "redux-persist";
// import { AsyncStorage } from "react-native";

// import rootReducer, { RootState } from "./rootReducer";

// const persistConfig = {
//   key: "root",
//   storage: AsyncStorage,
//   blacklist: [],
//   whitelist: ["emissions", "budget", "userPreferences"],
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: [],
// });

// export const persistor = persistStore(store);

// export type AppDispatch = typeof store.dispatch;

// export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

// export default store;

import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";

import saveUserReducer from "./reducers";
import setLanguageReducer from "./language_reducer";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["userInfo", "language"],
};

export const rootReducer = combineReducers({
  saveUserReducer: persistReducer(persistConfig, saveUserReducer),
  setLanguageReducer: persistReducer(persistConfig, setLanguageReducer),
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

export { store, persistor };
