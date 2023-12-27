import React from "react";
import {
  Outlet,
  createBrowserRouter,
  RouterProvider,
  NavLink,
} from "react-router-dom";
import { Misdemeanours } from "./pages/Misdemeanours";
import { ConfessToUs } from "./pages/ConfessToUs";
import { Home } from "./pages/Home";
import { NoMatch } from "./pages/404";

import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "misdemeanours",
        element: <Misdemeanours />,
      },
      {
        path: "confess-to-us",
        element: <ConfessToUs />,
      },
      {
        path: "*",
        element: <NoMatch />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}

function Layout() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/misdemeanours">Misdemeanours</NavLink>
          </li>
          <li>
            <NavLink to="/confess-to-us">Confess To Us</NavLink>
          </li>
        </ul>
      </nav>
      <div className="outlet">
        <Outlet />
      </div>
    </>
  );
}
