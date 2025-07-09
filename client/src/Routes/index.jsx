import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Page";
import Home from "../pages/Home/Page";
import DashLayout from "../pages/Dashboard/Layout";
import NotFound from "../pages/NotFound";
import SignIn from "../pages/Authentication/SignIn";
import SignUp from "../pages/Authentication/SignUp";
import GetStarted from "../pages/Authentication/GetStarted";


const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/app",
    element: <DashLayout />,
    children: [
      {
        path: "/app/dashboard",
        element: <Dashboard />,
      },
    ],
  },
  // Authentication routes can be added here
  // e.g., Login, Register, etc.
  {
    path: "/app/auth/signin",
    element: <SignIn />,
  },
  {
    path: "/app/auth/signup",
    element: <SignUp />,
  },
  {
    path: "/app/auth/start",
    element: <GetStarted />,
  },

  // Fallback route for Not Found
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default AppRoutes;
