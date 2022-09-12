import { createSlice } from "@reduxjs/toolkit";

export type dashboardState = {
  isOpen: [];
  opened: boolean;
}

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    isOpen: [],
    opened: true,
    navType: 'light'
  },
  reducers: {
    setMenu: (state, action) => {
      state.opened = action.payload;
    },
    menuOpen: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

export const { setMenu, menuOpen} = dashboardSlice.actions;
export default dashboardSlice.reducer;