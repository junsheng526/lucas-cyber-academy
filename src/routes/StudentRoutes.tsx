import Dashboard from "../modules/admin/Dashboard";
import EditProfile from "../modules/admin/EditProfile";
import { createSecureRoute } from "./routeUtils";

export const studentRoutes = [
  createSecureRoute("/dashboard", Dashboard),
  createSecureRoute("/edit-profile", EditProfile),
];
