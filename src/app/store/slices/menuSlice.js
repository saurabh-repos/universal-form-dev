import { createSlice } from "@reduxjs/toolkit";
import { MAIN_MENU_ITEMS, SIDEBAR_ITEMS } from "@/constants/menuConstants";

const initialState = {
  activeMainMenu: 0,
  activeFormId: 0,
  activePath: MAIN_MENU_ITEMS[0] ? MAIN_MENU_ITEMS[0].basePath + `?id=0` : "",
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setActiveMainMenu: (state, action) => {
      state.activeMainMenu = action.payload;
      const basePath = MAIN_MENU_ITEMS[action.payload]?.basePath || "";
      state.activePath = basePath + `?id=${state.activeFormId}`;
    },
    setActiveForm: (state, action) => {
      state.activeFormId = action.payload;
    },
    setActivePath: (state, action) => {
      const basePath = MAIN_MENU_ITEMS[state.activeFormId]?.basePath || "";
      state.activePath = basePath + `?id=${action.payload}`;
    },
  },
});

export const { setActiveMainMenu, setActiveForm,setActivePath } = menuSlice.actions;
export default menuSlice.reducer;
