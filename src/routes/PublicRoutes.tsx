import PageLogin from "../modules/auth/SignIn";
import PageSignUp from "../modules/auth/SignUp";
import CoursePage from "../modules/course/Course";
import CourseDetailsPage from "../modules/course/CourseDetailsPage";
import Home from "../modules/home/home";

export const publicRoutes = [
  { path: "/", element: <Home /> },
  { path: "/courses", element: <CoursePage /> },
  { path: "/login", element: <PageLogin /> },
  { path: "/register", element: <PageSignUp /> },
  { path: "/courses/:id", element: <CourseDetailsPage /> },
];
