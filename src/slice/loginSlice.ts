import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginPost } from "../api/memberApi";
import { removeCookie, setCookie } from "../util/cookieUtils";

export const loginPostAsync = createAsyncThunk<LoginResponse, LoginForm>(
  "loginPostAsync",
  (loginParam: LoginForm) => {
    return loginPost(loginParam);
  }
);

const initState: MemberEmail = {
  email: "",
};

export const loginSlice = createSlice({
  name: "loginSlice",
  initialState: initState,
  reducers: {
    logout: () => {
      removeCookie("member", "/");
      return { ...initState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginPostAsync.fulfilled, (state, action) => {
        if (!action.payload.error) {
          setCookie("member", JSON.stringify(action.payload), 1);
        }
        return action.payload;
      })
      .addCase(loginPostAsync.pending, (state, action) => {
        console.log("pending");
      })
      .addCase(loginPostAsync.rejected, (state, action) => {
        console.log("rejected");
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
