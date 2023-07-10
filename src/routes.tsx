import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { Layout } from "./layouts";
import { Error404, Metrics } from "./pages";

export default function Router() {
  const routes = useRoutes([
      {
          path: '/',
          element: <Layout />,
          children: [
              { path: '', element: <Metrics /> },
          ],
      },
  ])

  return routes;
}
