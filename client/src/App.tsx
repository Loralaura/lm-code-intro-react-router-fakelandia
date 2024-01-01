import {
  Outlet,
  createHashRouter,
  RouterProvider,
  NavLink,
} from "react-router-dom";
import React, { createContext, useEffect, useMemo, useState } from "react";
import "./App.css";
import { Footer } from "./components/Footer/Footer";
import { Misdemeanour } from "./types/misdemeanours.types";
import { Misdemeanours } from "./pages/Misdemeanours";
import { NoMatch } from "./pages/404";
import { ConfessToUs } from "./pages/ConfessToUs";
import { Home } from "./pages/Home";
import axios from "axios";

type ContextProps = {
  misdemeanours: Misdemeanour[];
  setMisdemeanours: (misdemeanours: Misdemeanour[]) => void;
};

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
        <a href="#/">
          <img
            className="logo"
            src="https://img.freepik.com/premium-vector/attorney-law-service-justice-logo-design_779965-8.jpg?size=300"
            alt="Fakelandia Justice Department logo"
          />
        </a>
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
export const routersConfig = [
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
];

const router = createHashRouter(routersConfig);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}
