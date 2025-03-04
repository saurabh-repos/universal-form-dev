"use client";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { MAIN_MENU_ITEMS, SIDEBAR_ITEMS } from "@/constants/menuConstants";
import { setActiveMainMenu, setActivePath } from "@/app/store/slices/menuSlice";
import { useEffect } from "react";

const MenuBar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const activeMainMenu = useSelector((state) => state.menu.activeMainMenu);
  const activePath = useSelector((state) => state.menu.activePath);

  const handleMenuClick = (menuId) => {
    dispatch(setActiveMainMenu(menuId));
  };

  useEffect(() => {
    if (activePath) {
      router.push(activePath);
    }
  }, [activePath, router]);

  return (
    <nav className="w-3/4 h-11 bg-white text-[#999999] flex space-x-4 border rounded-2xl border-black pl-4">
      {MAIN_MENU_ITEMS.map((menu) => (
        <button
          key={menu.name}
          onClick={() => handleMenuClick(menu?.id)}
          className={`h-full ${
            MAIN_MENU_ITEMS[activeMainMenu].name === menu?.name
              ? "font-bold text-black"
              : ""
          }`}
        >
          {menu.name}
        </button>
      ))}
    </nav>
  );
};

export default MenuBar;
