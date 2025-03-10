import Dashboard from "../modules/admin/Dashboard";
import EditProfile from "../modules/admin/EditProfile";
import ManageCourse from "../modules/admin/ManageCourse";
import ManageHomeContent from "../modules/admin/ManageHomeContent";
import ManageLecturers from "../modules/admin/ManageLecturers";
import { createSecureRoute } from "./routeUtils";

export const adminRoutes = [
  createSecureRoute("/dashboard", ["admin", "lecturer"], Dashboard),
  createSecureRoute(
    "/edit-profile",
    ["admin", "lecturer", "student"],
    EditProfile
  ),
  createSecureRoute("/manage-course", ["admin"], ManageCourse),
  createSecureRoute("/manage-lecturers", ["admin"], ManageLecturers),
  createSecureRoute("/manage-home", ["admin"], ManageHomeContent),
];
