import { PiFlagBanner } from "react-icons/pi";
import { FiSend } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

export const MAIN_MENU_ITEMS = [
  { id: 0, name: "Create Form", basePath: "/forms/create" },
  { id: 1, name: "Add Hierarchy", basePath: "/hierarchy/create" },
  { id: 2, name: "Create Reports Panel", basePath: "/reports" },
  { id: 3, name: "Access/Permissions", basePath: "/permissions" },
];

export const SIDEBAR_ITEMS = [
  {
    id: 0,
    menuId: 0,
    label: "Untitled 1",
    subItems: [
      { id: 1, label: "Header", icon: <PiFlagBanner />, action: "headerAction" },
      { id: 2, label: "Publish Changes", icon:<FiSend />, action: "publishAction" },
      { id: 3, label: "Delete", icon: <RiDeleteBin6Line />, action: "deleteAction" },
    ],
    isExpanded: true,
    editMode: false,
  },
];
