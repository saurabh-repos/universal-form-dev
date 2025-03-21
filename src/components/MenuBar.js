"use client";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { MAIN_MENU_ITEMS, SIDEBAR_ITEMS } from "@/constants/menuConstants";
import { useEffect } from "react";
import { RiArrowGoBackFill, RiArrowGoForwardFill } from "react-icons/ri";
import { IoEyeOutline } from "react-icons/io5";
import { IoMdLink } from "react-icons/io";
import { TbColorSwatch } from "react-icons/tb";
import {
  setActiveMainMenu,
  setActivePath
} from "@/redux/store/slices/menuSlice";
import { BiSave } from "react-icons/bi";
import { saveFormToServer } from "@/redux/asyncActions/formActions";
import { setActiveFormId } from "@/redux/store/slices/formSlice";

const MenuBar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const activeMainMenu = useSelector((state) => state.menu.activeMainMenu);
  const activeFormId = useSelector((state) => state.menu.activeFormId);
  const activePath = useSelector((state) => state.menu.activePath);
  const formChanges = useSelector(
    (state) => state.forms?.formChanges[activeFormId]
  );

  const handleMenuClick = (menuId) => {
    dispatch(setActiveMainMenu(menuId));
    dispatch(setActivePath(activeFormId));
  };

  const handleSaveClick = () => {
    if (formChanges) {
      dispatch(saveFormToServer(activeFormId));
    }
  };

  const handleViewClick = () => {
    dispatch(setActiveFormId(activeFormId));
    // router.push(`/forms/view`);
    localStorage.setItem("activePath", `/forms/view?id=${activeFormId}`);
    window.open(`/forms/view?id=${activeFormId}`, "_blank");
  };

  useEffect(() => {
    if (activePath) {
      router.push(activePath);
    }
  }, [activePath, router]);

  return (
    <div className="flex sticky">
      <nav className="w-[80%] h-11 bg-white text-[#999999] flex space-x-4 border rounded-2xl border-black pl-4">
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
      <div className="w-[10%] ml-[1.5%] h-11 bg-white text-[#999999] flex items-center justify-center space-x-1 border rounded-2xl border-black">
        <TbColorSwatch className="text-black cursor-pointer" />
        <span className="text-black">|</span>
        <RiArrowGoBackFill className="text-black cursor-pointer" />
        <span className="text-black">|</span>
        <RiArrowGoForwardFill className="text-black cursor-pointer" />
      </div>
      <div className="w-[7%] ml-[1.5%] h-11 bg-white text-[#999999] flex items-center justify-center space-x-1 border rounded-2xl border-black">
        {formChanges ? (
          <BiSave className="text-black cursor-pointer" onClick={handleSaveClick} />
        ) : (
          <IoEyeOutline className="text-black cursor-pointer" onClick={handleViewClick} />
        )}
        <span className="text-black">|</span>
        <IoMdLink className="text-black cursor-pointer" />
      </div>
    </div>
  );
};

export default MenuBar;
