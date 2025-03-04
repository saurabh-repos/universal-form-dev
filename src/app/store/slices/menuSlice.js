import { createSlice } from "@reduxjs/toolkit";
import { SIDEBAR_ITEMS } from "@/constants/menuConstants";

const initialState = {
  activeMainMenu: "Dashboard",
  activeSidebarItem: SIDEBAR_ITEMS["Dashboard"][0].path, 
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setActiveMainMenu: (state, action) => {
      state.activeMainMenu = action.payload;
      state.activeSidebarItem = SIDEBAR_ITEMS[action.payload][0]?.path || "";
    },
    setActiveSidebarItem: (state, action) => {
      state.activeSidebarItem = action.payload;
    },
  },
});

export const { setActiveMainMenu, setActiveSidebarItem } = menuSlice.actions;
export default menuSlice.reducer;
