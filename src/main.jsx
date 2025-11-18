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
import PrivateRoute from "./layout/PrivateRoute.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ForgotPassword } from "./pages/ForgotPassword.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        index: true,
        element: <Home />,
        loader: async () => {
          const [servicesRes, vetsRes] = await Promise.all([
            fetch("/data.json"),
            fetch("/vetData.json"),
          ]);

          if (!servicesRes.ok || !vetsRes.ok) {
            throw new Response("Failed to load data", { status: 500 });
          }

          const [servicedata, vetdata] = await Promise.all([
            servicesRes.json(),
            vetsRes.json(),
          ]);

          return { servicedata, vetdata };
        },
      },
      {
        path: "/services",
        element: <Services />,
        loader: async () => {
          const res = await fetch("/data.json");
          if (!res.ok) {
            throw new Response("Failed to load services", {
              status: res.status,
            });
          }
          const servdata = await res.json();
          return servdata;
        },
      },
      {
        path: "/myprofile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/servicedetails/:id",
        loader: async ({ params }) => {
          const res = await fetch("/data.json");
          const allserv = await res.json();
          return { allserv, id: params.id };
        },
        element: (
          <PrivateRoute>
            <ServiceDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
