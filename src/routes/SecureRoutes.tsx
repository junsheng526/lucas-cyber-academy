import Dashboard from "../modules/admin/Dashboard";
import EditProfile from "../modules/admin/EditProfile";
import ManageCourse from "../modules/admin/ManageCourse";
import ManageGrayscale from "../modules/admin/ManageGrayscale";
import ManageHomeContent from "../modules/admin/ManageHomeContent";
import ManageLecturers from "../modules/admin/ManageLecturers";
import LecturerDashboard from "../modules/lecturer/LecturerDashboard";
import ManageEnrollments from "../modules/lecturer/ManageEnrollments";
import ManageSchedule from "../modules/lecturer/ManageSchedule";
import StudentDashboard from "../modules/student/StudentDashboard";
import ViewSchedule from "../modules/student/ViewSchedule";
import { createSecureRoute } from "./routeUtils";

export const secureRoutes = [
  createSecureRoute("/dashboard", ["admin"], Dashboard),
  createSecureRoute("/lecturer-dashboard", ["lecturer"], LecturerDashboard),
  createSecureRoute(
    "/edit-profile",
    ["admin", "lecturer", "student"],
    EditProfile
  ),
  createSecureRoute("/manage-course", ["admin"], ManageCourse),
  createSecureRoute("/manage-lecturers", ["admin"], ManageLecturers),
  createSecureRoute("/manage-home", ["admin"], ManageHomeContent),
  createSecureRoute("/manage-enrollments", ["lecturer"], ManageEnrollments),
  createSecureRoute("/manage-schedule", ["lecturer"], ManageSchedule),
  createSecureRoute("/student-dashboard", ["student"], StudentDashboard),
  createSecureRoute("/view-schedule", ["student"], ViewSchedule),
  createSecureRoute("/manage-grayscale", ["admin"], ManageGrayscale),
];
