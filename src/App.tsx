import "./App.css";
import "./index.css";
import "./styles/global.scss";
import { Route, Routes } from "react-router-dom";
import Login from "./modules/auth/login";
import Register from "./modules/auth/register";
import NotFound from "./layout/page-not-found";
import Home from "./modules/home/home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
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
