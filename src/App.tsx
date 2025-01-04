import "./App.css";
import "./index.css";
import "./styles/global.scss";
import { Route, Routes } from "react-router-dom";
import Home from "./modules/home/home";
import CoursePage from "./modules/course/Course";
import PageLogin from "./modules/auth/SignIn";
import PageSignUp from "./modules/auth/SignUp";
import NotFound from "./layout/not-found";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/home" element={<Home />} /> */}
      <Route path="/courses" element={<CoursePage />} />
      <Route path="/login" element={<PageLogin />} />
      <Route path="/register" element={<PageSignUp />} />
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
  );
}

export default App;
