import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { Root } from "./layout/Root.jsx";
import { Home } from "./pages/home.jsx";
import { Services } from "./pages/Services.jsx";
import { MyProfile } from "./pages/MyProfile.jsx";
import { ServiceDetails } from "./pages/ServiceDetails.jsx";
import { SignUp } from "./pages/SignUp.jsx";
import { SignIn } from "./pages/SignIn.jsx";
import "aos/dist/aos.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        index: true,
        element: <Home />,
        loader: () => fetch("/data.json"),
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/myprofile",
        element: <MyProfile />,
      },
      {
        path: "/servicedetails",
        element: <ServiceDetails />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
