import { createSlice } from "@reduxjs/toolkit";
import { MAIN_MENU_ITEMS, SIDEBAR_ITEMS } from "@/constants/menuConstants";

const initialState = {
  activeMainMenu: "Create Form",
  activeSidebarItem: SIDEBAR_ITEMS.length > 0 ? SIDEBAR_ITEMS[0].path : "",
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setActiveMainMenu: (state, action) => {
      state.activeMainMenu = action.payload;
      const selectedMenu = MAIN_MENU_ITEMS.find((item) => item.name === action.payload);

      if (selectedMenu) {
        const firstSidebarItem = SIDEBAR_ITEMS.find(item => item.menuId === selectedMenu.id);

        state.activeSidebarItem = firstSidebarItem ? firstSidebarItem.path : "";
      }
    },
    setActiveSidebarItem: (state, action) => {
      state.activeSidebarItem = action.payload;
    },
  },
});

export const { setActiveMainMenu, setActiveSidebarItem } = menuSlice.actions;
export default menuSlice.reducer;
