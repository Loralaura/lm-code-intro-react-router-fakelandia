import React, { createContext, useEffect, useMemo, useState } from "react";
import {
  Outlet,
  createBrowserRouter,
  RouterProvider,
  NavLink,
} from "react-router-dom";
import { Misdemeanours } from "./pages/Misdemeanours";
import { Misdemeanour } from "./types/misdemeanours.types";
import { ConfessToUs } from "./pages/ConfessToUs";
import { Home } from "./pages/Home";
import { NoMatch } from "./pages/404";
import { Footer } from "./components/Footer/Footer";
import axios from "axios";

import "./App.css";

type ContextProps = {
  misdemeanours: Misdemeanour[];
  setMisdemeanours: (misdemeanours: Misdemeanour[]) => void;
};

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
  const [misdemeanours, setMisdemeanours] = useState<Misdemeanour[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    async function getMisdemeanours() {
      try {
        const response = await axios(
          "http://localhost:8080/api/misdemeanours/30"
        );
        setMisdemeanours(response.data.misdemeanours);
      } catch (error) {
        setErrorMessage("ERROR: Server is not running!");
      }
    }
    getMisdemeanours();
  }, []);

  const value = useMemo(
    () => ({ misdemeanours, setMisdemeanours }),
    [misdemeanours]
  );

  if (errorMessage) return <h1>{errorMessage}</h1>;
  if (misdemeanours.length === 0) return <div>Loading...</div>;

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
      <MisdemeanoursContext.Provider value={value}>
        <div className="outlet">
          <Outlet />
        </div>
      </MisdemeanoursContext.Provider>
      <Footer />
    </>
  );
}

export const MisdemeanoursContext = createContext<ContextProps>({
  misdemeanours: [],
  setMisdemeanours: () => {},
});
