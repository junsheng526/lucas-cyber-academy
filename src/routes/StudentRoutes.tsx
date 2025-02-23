import Dashboard from "../modules/admin/Dashboard";
import EditProfile from "../modules/admin/EditProfile";
import ManageGrayscale from "../modules/admin/ManageGrayscale";
import ViewSchedule from "../modules/student/ViewSchedule";
import { createSecureRoute } from "./routeUtils";

export const studentRoutes = [
  createSecureRoute("/dashboard", Dashboard),
  createSecureRoute("/edit-profile", EditProfile),
  createSecureRoute("/view-schedule", ViewSchedule),
  createSecureRoute("/manage-grayscale", ManageGrayscale),
];
