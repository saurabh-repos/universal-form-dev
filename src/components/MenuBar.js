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
    <nav className="bg-gray-800 text-white p-3 flex space-x-4">
      {MAIN_MENU_ITEMS.map((menu) => (
        <button
          key={menu.name}
          onClick={() => handleMenuClick(menu.name)}
          className={`p-2 rounded-md ${activeMainMenu === menu.name ? "bg-gray-600" : "hover:bg-gray-700"}`}
        >
          {menu.name}
        </button>
      ))}
    </nav>
  );
};

export default MenuBar;
