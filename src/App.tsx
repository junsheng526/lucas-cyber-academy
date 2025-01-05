import "./App.css";
import "./index.css";
import "./styles/global.scss";
import { Route, Routes } from "react-router-dom";
import Home from "./modules/home/home";
import CoursePage from "./modules/course/Course";
import PageLogin from "./modules/auth/SignIn";
import PageSignUp from "./modules/auth/SignUp";
import NotFound from "./modules/not-found";
import Dashboard from "./modules/admin/Dashboard";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./styles/theme";
import { useState } from "react";
import DashboardLayout from "./components/templates/layout/DashboardLayout";
import { ProtectedRoute } from "./firebase/ProtectedRoute";
import EditProfile from "./modules/admin/EditProfile";

// Define route lists
const publicRoutes = [
  { path: "/", element: <Home /> },
  { path: "/courses", element: <CoursePage /> },
  { path: "/login", element: <PageLogin /> },
  { path: "/register", element: <PageSignUp /> },
];

const secureRoutes = [
  {
    path: "/dashboard",
    element: (
      isSidebar: boolean,
      setIsSidebar: React.Dispatch<React.SetStateAction<boolean>>
    ) => (
      <DashboardLayout isSidebar={isSidebar} setIsSidebar={setIsSidebar}>
        <Dashboard />
      </DashboardLayout>
    ),
  },
  {
    path: "/edit-profile",
    element: (
      isSidebar: boolean,
      setIsSidebar: React.Dispatch<React.SetStateAction<boolean>>
    ) => (
      <DashboardLayout isSidebar={isSidebar} setIsSidebar={setIsSidebar}>
        <EditProfile />
      </DashboardLayout>
    ),
  },
];

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          {/* Map public routes */}
          {publicRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}

          {/* Map secure routes with ProtectedRoute */}
          {secureRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <ProtectedRoute
                  element={route.element(isSidebar, setIsSidebar)}
                />
              }
            />
          ))}

          {/* Fallback to NotFound */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
