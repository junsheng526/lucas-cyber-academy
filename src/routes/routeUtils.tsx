import DashboardLayout from "../components/templates/layout/DashboardLayout";

export const createSecureRoute = (path: string, Component: React.FC) => ({
  path,
  element: (
    isSidebar: boolean,
    setIsSidebar: React.Dispatch<React.SetStateAction<boolean>>
  ) => (
    <DashboardLayout isSidebar={isSidebar} setIsSidebar={setIsSidebar}>
      <Component />
    </DashboardLayout>
  ),
});
