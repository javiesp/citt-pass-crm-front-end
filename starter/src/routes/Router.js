import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Loadable from "../layouts/loader/Loadable";
import Login from "../views/auth/Login";
import Colaborators from "~/pages/colaborators.vue";

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
const PerfilUsuario = Loadable(lazy(() => import("~/pages/perfilusuario.vue"))); // Ensure this path is correct

/* Routes */
const ThemeRoutes = [
  {
    path: "/",
    element: <Gestoringreso />,
    children: [
      { path: "/gestoringreso", element: <Gestoringreso /> },
      { path: "/about", element: <About /> },
      { path: "/ui/alerts", element: <Alerts /> },
      { path: "/badges", element: <Badges /> },
      { path: "/buttons", element: <Buttons /> },
      { path: "/cards", element: <Cards /> },
      { path: "/grid", element: <Grid /> },
      { path: "/table", element: <Tables /> },
      { path: "/forms", element: <Forms /> },
      { path: "/breadcrumbs", element: <Breadcrumbs /> },
      { path: "/productos", element: <Productos /> },
      { path: "/colaborators", element: <Colaborators /> },
      { path: "/perfil", element: <PerfilUsuario /> }, // Corrected to use lazy-loaded component
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
