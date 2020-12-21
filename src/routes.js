import React from "react";
import { Navigate } from "react-router-dom";
import DashboardLayout from "src/layouts/DashboardLayout";
import MainLayout from "src/layouts/MainLayout";
import NotFoundView from "src/utils/NotFoundView";
import VTVNews from "./views/VTVNews";
import MoreLikeThis from "./views/MoreLikeThis";
const routes = [
  {
    path: "20201-tktt",
    element: <DashboardLayout />,
    children: [
      { path: "vtv-news", element: <VTVNews /> },
      { path: "more-like-this", element: <MoreLikeThis /> },
      { path: "*", element: <Navigate to="/404" replace={true} /> },
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "404", element: <NotFoundView /> },
      { path: "/", element: <Navigate to="/20201-tktt/vtv-news" /> },
      { path: "*", element: <Navigate to="/404" replace={true} /> },
    ],
  },
];

export default routes;
