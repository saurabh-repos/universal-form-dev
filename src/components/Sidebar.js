"use client";

import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { SIDEBAR_ITEMS } from "@/constants/menuConstants";
import { setActiveSidebarItem } from "@/app/store/slices/menuSlice";


const Sidebar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const activeMainMenu = useSelector((state) => state.menu.activeMainMenu);
  const activeSidebarItem = useSelector((state) => state.menu.activeSidebarItem);

  // ✅ Memoize sidebarItems to prevent re-creation on every render
  const sidebarItems = useMemo(() => SIDEBAR_ITEMS[activeMainMenu] || [], [activeMainMenu]);

  useEffect(() => {
    // ✅ Check if the current path exists in the sidebar items
    const isCurrentPathValid = sidebarItems.some((item) => item.path === pathname);

    if (!isCurrentPathValid && sidebarItems.length > 0) {
      const firstSidebarItem = sidebarItems[0].path;
      dispatch(setActiveSidebarItem(firstSidebarItem));
      router.replace(firstSidebarItem); // Ensure smooth redirection
    }
  }, [pathname, activeMainMenu, dispatch, router, sidebarItems]); // ✅ sidebarItems is now stable

  return (
    <aside className="w-64 bg-gray-100 p-4 h-screen">
      <h2 className="font-semibold text-lg">{activeMainMenu} Options</h2>
      <ul className="mt-2">
        {sidebarItems.map((item) => (
          <li
            key={item.path}
            className={`p-2 rounded-md cursor-pointer ${
              activeSidebarItem === item.path ? "bg-gray-300 font-bold" : "hover:bg-gray-200"
            }`}
            onClick={() => {
              dispatch(setActiveSidebarItem(item.path));
              router.push(item.path);
            }}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
