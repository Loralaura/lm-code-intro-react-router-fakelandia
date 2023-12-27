import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { Misdemeanours } from "./pages/Misdemeanours";
import { ConfessToUs } from "./pages/ConfessToUs";
import { Home } from "./pages/Home";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
    ],
  },
]);

function App() {
  return <div className="App"></div>;
}

export default App;
