import Dashboard from "../modules/admin/Dashboard";
import EditProfile from "../modules/admin/EditProfile";
import ManageEnrollments from "../modules/lecturer/ManageEnrollments";
import ManageSchedule from "../modules/lecturer/ManageSchedule";
import { createSecureRoute } from "./routeUtils";

export const lecturerRoutes = [
  createSecureRoute("/manage-enrollments", ["lecturer"], ManageEnrollments),
  createSecureRoute("/manage-schedule", ["lecturer"], ManageSchedule),
];
