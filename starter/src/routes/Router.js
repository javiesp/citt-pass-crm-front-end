import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Loadable from "../layouts/loader/Loadable";
import Login from "../views/auth/Login";
import Colaborators from "~/pages/colaborators.vue";
import ProtectedRoute from "./ProtectedRoute"; // Importa el componente

/* Layouts */
const FullLayout = Loadable(lazy(() => import("../layouts/FullLayout")));
const BlankLayout = Loadable(lazy(() => import("../layouts/BlankLayout")));

/* Pages */
const Starter = Loadable(lazy(() => import("../views/Starter")));
const About = Loadable(lazy(() => import("../views/About")));
const Alerts = Loadable(lazy(() => import("../views/ui/Alerts")));
const Badges = Loadable(lazy(() => import("../views/ui/Badges")));
const Buttons = Loadable(lazy(() => import("../views/ui/Buttons")));
const Cards = Loadable(lazy(() => import("../views/ui/Cards")));
const Grid = Loadable(lazy(() => import("../views/ui/Grid")));
const Tables = Loadable(lazy(() => import("../views/ui/Tables")));
const Forms = Loadable(lazy(() => import("../views/ui/Forms")));
const Breadcrumbs = Loadable(lazy(() => import("../views/ui/Breadcrumbs")));
const Productos = Loadable(lazy(() => import("../views/Productos")));
const Error = Loadable(lazy(() => import("../views/auth/Error")));

/* Routes */
const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/gestoringreso", element: <ProtectedRoute><Gestoringreso /></ProtectedRoute> },
      { path: "/about", element: <ProtectedRoute><About /></ProtectedRoute> },
      { path: "/ui/alerts", element: <ProtectedRoute><Alerts /></ProtectedRoute> },
      { path: "/badges", element: <ProtectedRoute><Badges /></ProtectedRoute> },
      { path: "/buttons", element: <ProtectedRoute><Buttons /></ProtectedRoute> },
      { path: "/cards", element: <ProtectedRoute><Cards /></ProtectedRoute> },
      { path: "/grid", element: <ProtectedRoute><Grid /></ProtectedRoute> },
      { path: "/table", element: <ProtectedRoute><Tables /></ProtectedRoute> },
      { path: "/forms", element: <ProtectedRoute><Forms /></ProtectedRoute> },
      { path: "/breadcrumbs", element: <ProtectedRoute><Breadcrumbs /></ProtectedRoute> },
      { path: "/productos", element: <ProtectedRoute><Productos /></ProtectedRoute> },
      { path: "/colaborators", element: <ProtectedRoute><Colaborators /></ProtectedRoute> },
      { path: "*", element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: "/auth",
    element: <BlankLayout />,
    children: [
      { path: "404", element: <Error /> },
      { path: "*", element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default ThemeRoutes;