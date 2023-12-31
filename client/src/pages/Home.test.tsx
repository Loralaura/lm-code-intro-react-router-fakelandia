import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Home } from "./Home";
import { MisdemeanoursContext } from "../App";

describe("Home", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("should render home with 1 misdemeanour", () => {
    const setMisdemeanours = jest.fn();

    render(
      <MisdemeanoursContext.Provider
        value={{
          misdemeanours: [
            { citizenId: 1, date: "", details: "", misdemeanour: "rudeness" },
          ],
          setMisdemeanours,
        }}
      >
        <Home />
      </MisdemeanoursContext.Provider>
    );
    const home = screen.getByTestId("home");
    expect(home).toBeInTheDocument();
    const misdemeanour = screen.getByText("Total Misdemeanours: 1");
    expect(misdemeanour).toBeInTheDocument();
  });
});
