import EditProfile from "../modules/admin/EditProfile";
import ManageGrayscale from "../modules/admin/ManageGrayscale";
import StudentDashboard from "../modules/student/StudentDashboard";
import ViewSchedule from "../modules/student/ViewSchedule";
import { createSecureRoute } from "./routeUtils";

export const studentRoutes = [
  createSecureRoute("/student-dashboard", StudentDashboard),
  createSecureRoute("/edit-profile", EditProfile),
  createSecureRoute("/view-schedule", ViewSchedule),
  createSecureRoute("/manage-grayscale", ManageGrayscale),
];
