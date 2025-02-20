import "./App.css";
import "./index.css";
import "./styles/global.scss";
import { Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./styles/theme";
import { useState } from "react";
import NotFound from "./routes/NotFound";
import { publicRoutes } from "./routes/PublicRoutes";
import { adminRoutes } from "./routes/AdminRoutes";
import { lecturerRoutes } from "./routes/LecturerRoutes";
import { studentRoutes } from "./routes/StudentRoutes";

const secureRoutes = [...adminRoutes, ...lecturerRoutes, ...studentRoutes];

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
          {secureRoutes.map(({ path, element }) => (
            <Route
              key={path}
              path={path}
              element={element(isSidebar, setIsSidebar)}
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
