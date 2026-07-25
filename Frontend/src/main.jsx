import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import Forget from "./pages/Forget.jsx";
import Verify from "./pages/Verify.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/forgot-password",
    element: <Forget />,
  },

  {
    path: "/verify",
    element: <Verify />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
