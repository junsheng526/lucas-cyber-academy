import PageLogin from "../modules/auth/SignIn";
import PageSignUp from "../modules/auth/SignUp";
import CoursePage from "../modules/course/Course";
import CourseDetailsPage from "../modules/course/CourseDetailsPage";
import Home from "../modules/home/home";
import ContactUs from "../modules/contact-us/ContactUs";
import AboutUs from "../modules/about-us/AboutUs";
import PageResetPassword from "../modules/auth/ResetPassword";

export const publicRoutes = [
  { path: "/", element: <Home /> },
  { path: "/courses", element: <CoursePage /> },
  { path: "/login", element: <PageLogin /> },
  { path: "/register", element: <PageSignUp /> },
  { path: "/reset-password", element: <PageResetPassword /> },
  { path: "/courses/:id", element: <CourseDetailsPage /> },
  { path: "/contact-us", element: <ContactUs /> },
  { path: "/about-us", element: <AboutUs /> },
];
