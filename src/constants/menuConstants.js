export const MAIN_MENU_ITEMS = [
  { id: 1, name: "Create Form" },
  { id: 2, name: "Add Hierarchy" },
  { id: 3, name: "Create Reports Panel" },
  { id: 4, name: "Access/Permissions" },
];

export const SIDEBAR_ITEMS = [
  {
    id: 1,
    menuId: 1,
    label: "Untitled 1",
    path: "/forms/create/1",
    subItems: [
      { id: 1, label: "Header", icon: "📌", action: "headerAction" },
      { id: 2, label: "Publish", icon: "🚀", action: "publishAction" },
      { id: 3, label: "Delete", icon: "🗑️", action: "deleteAction" },
    ],
  },
];

