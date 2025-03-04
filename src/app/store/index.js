import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./slices/menuSlice";
import sidebarReducer from "./slices/sidebarSlice";

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    sidebar: sidebarReducer,
  },
});
