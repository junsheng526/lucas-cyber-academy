import Dashboard from "../modules/admin/Dashboard";
import EditProfile from "../modules/admin/EditProfile";
import ManageCourse from "../modules/admin/ManageCourse";
import ManageLecturers from "../modules/admin/ManageLecturers";
import { createSecureRoute } from "./routeUtils";

export const adminRoutes = [
  createSecureRoute("/dashboard", Dashboard),
  createSecureRoute("/edit-profile", EditProfile),
  createSecureRoute("/manage-course", ManageCourse),
  createSecureRoute("/manage-lecturers", ManageLecturers),
];
