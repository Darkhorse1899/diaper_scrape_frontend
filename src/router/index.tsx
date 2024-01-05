import { useRoutes } from "react-router-dom";

import Dashboard from "../pages/Dashboard";

import Layout from "../themes";

function Router() {
  const routes = [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Dashboard />,
        },
      ],
    },
  ];

  return useRoutes(routes);
}

export default Router;
