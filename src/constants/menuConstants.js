export const MAIN_MENU_ITEMS = [
  { id: 1, name: "Dashboard" },
  { id: 2, name: "Forms" },
  { id: 3, name: "Create Reports Panel" },
  { id: 4, name: "Access/Permissions" },
];

export const SIDEBAR_ITEMS = {
  Dashboard: [
    { label: "Overview", path: "/dashboard/overview" },
    { label: "Analytics", path: "/dashboard/analytics" },
    { label: "Recent Activity", path: "/dashboard/recent-activity" },
  ],
  Forms: [
    { label: "Create Form", path: "/forms/create" },
    { label: "Templates", path: "/forms/templates" },
    { label: "Form Settings", path: "/forms/settings" },
  ],
  "Create Reports Panel": [
    { label: "Generate Report", path: "/reports/generate" },
    { label: "View Reports", path: "/reports/view" },
    { label: "Export Data", path: "/reports/export" },
  ],
  "Access/Permissions": [
    { label: "User Roles", path: "/permissions/roles" },
    { label: "Manage Access", path: "/permissions/access" },
    { label: "Security Settings", path: "/permissions/security" },
  ],
};
