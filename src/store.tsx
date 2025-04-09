import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slice/loginSlice";

const store = configureStore({
  reducer: {
    loginSlice: loginReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
