import { createSlice } from "@reduxjs/toolkit";

export type UserState = {
  currentUser: any;
  isFetching: boolean;
  error: boolean;
  errorList: object[];
}

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
    errorList: []
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state,action) => {
      state.isFetching = false;
      state.error = true;
      state.errorList = action.payload;
    },
    signupStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    signUpSuccess: (state) => {
      state.isFetching = false;
      state.error = false;
    },
    signUpFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    signOutSuccess: (state) => {
      state.isFetching = false;
      state.currentUser = null;
      state.error = false;
    },
    signOutFailed: (state) => {
      state.error = true;
    },
    resetErrorState: (state) =>{
      state.isFetching = false;
      state.error = false;
      state.errorList = [];
    }
  },
});

export const { loginStart, loginSuccess, loginFailure , signOutSuccess, signOutFailed,
              signUpSuccess, signupStart, signUpFailure, resetErrorState} = userSlice.actions;
export default userSlice.reducer;