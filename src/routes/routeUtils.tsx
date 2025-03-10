import DashboardLayout from "../components/templates/layout/DashboardLayout";
import { ProtectedRoute } from "./ProtectedRoute";

export const createSecureRoute = (
  path: string,
  allowedRoles: string[],
  Component: React.FC
) => ({
  path,
  allowedRoles,
  element: (
    isSidebar: boolean,
    setIsSidebar: React.Dispatch<React.SetStateAction<boolean>>
  ) => (
    <ProtectedRoute
      allowedRoles={allowedRoles}
      element={
        <DashboardLayout isSidebar={isSidebar} setIsSidebar={setIsSidebar}>
          <Component />
        </DashboardLayout>
      }
    />
  ),
});
