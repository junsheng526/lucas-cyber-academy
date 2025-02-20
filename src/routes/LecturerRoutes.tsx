import Dashboard from "../modules/admin/Dashboard";
import EditProfile from "../modules/admin/EditProfile";
import ManageEnrollments from "../modules/lecturer/ManageEnrollments";
import ManageSchedule from "../modules/lecturer/ManageSchedule";
import { createSecureRoute } from "./routeUtils";

export const lecturerRoutes = [
  createSecureRoute("/dashboard", Dashboard),
  createSecureRoute("/manage-enrollments", ManageEnrollments),
  createSecureRoute("/manage-schedule", ManageSchedule),
  createSecureRoute("/edit-profile", EditProfile),
];
