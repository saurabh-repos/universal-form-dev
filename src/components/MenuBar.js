"use client";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { MAIN_MENU_ITEMS, SIDEBAR_ITEMS } from "@/constants/menuConstants";
import { setActiveMainMenu } from "@/app/store/slices/menuSlice";


const MenuBar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const activeMainMenu = useSelector((state) => state.menu.activeMainMenu);

  const handleMenuClick = (menuName) => {
    dispatch(setActiveMainMenu(menuName));

    // Navigate to first sidebar item of new menu
    const firstSidebarItem = SIDEBAR_ITEMS[menuName]?.[0]?.path;
    if (firstSidebarItem) {
      router.push(firstSidebarItem);
    }
  };

  return (
    <nav className="w-3/4 bg-white text-[#999999] flex space-x-4 border rounded-2xl border-black pl-4">
      {MAIN_MENU_ITEMS.map((menu) => (
        <button
          key={menu.name}
          onClick={() => handleMenuClick(menu.name)}
          className={`h-11 ${activeMainMenu === menu.name ? "font-bold text-black" : ""}`}
        >
          {menu.name}
        </button>
      ))}
    </nav>
  );
};

export default MenuBar;
