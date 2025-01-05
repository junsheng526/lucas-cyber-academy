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

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/home" element={<Home />} /> */}
          <Route path="/courses" element={<CoursePage />} />
          <Route path="/login" element={<PageLogin />} />
          <Route path="/register" element={<PageSignUp />} />
          <Route
            path="/dashboard"
            element={
              <DashboardLayout
                isSidebar={isSidebar}
                setIsSidebar={setIsSidebar}
              >
                <Dashboard />
              </DashboardLayout>
            }
          />

          {/* <Route
        path="/"
        element={
          <ProtectedRoute
            element={
              <Layout isSidebar={isSidebar} setIsSidebar={setIsSidebar}>
                <Dashboard />
              </Layout>
            }
          />
        }
      /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
