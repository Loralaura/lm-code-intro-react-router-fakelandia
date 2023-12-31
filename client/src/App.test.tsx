import React from "react";
import { render, screen } from "@testing-library/react";
import App, { routersConfig } from "./App";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import "@testing-library/jest-dom";
import { Misdemeanour } from "./types/misdemeanours.types";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("App", () => {
  test("renders App at Home", async () => {
    const get = http.get("http://localhost:8080/api/misdemeanours/30", () => {
      return HttpResponse.json({ misdemeanours: data });
    });

    server.use(get);

    render(<App />);
    const home = await screen.findByTestId("home");
    expect(home).toBeInTheDocument();
    const misdemeanour = await screen.findByText("Total Misdemeanours: 5");
    expect(misdemeanour).toBeInTheDocument();
  });

  test("renders App at Misdemeanour", async () => {
    const get = http.get("http://localhost:8080/api/misdemeanours/30", () => {
      return HttpResponse.json({ misdemeanours: data });
    });

    server.use(get);

    const router = createMemoryRouter(routersConfig, {
      initialEntries: ["/misdemeanours"],
    });

    render(<RouterProvider router={router} />);

    const home = await screen.findByTestId("misdemeanours");
    expect(home).toBeInTheDocument();
  });

  test("renders App at ConfessToUs", async () => {
    const get = http.get("http://localhost:8080/api/misdemeanours/30", () => {
      return HttpResponse.json({ misdemeanours: data });
    });

    server.use(get);

    const router = createMemoryRouter(routersConfig, {
      initialEntries: ["/confess-to-us"],
    });

    render(<RouterProvider router={router} />);

    const home = await screen.findByTestId("confess-to-us");
    expect(home).toBeInTheDocument();
  });

  test("renders App server error", async () => {
    const get = http.get("http://localhost:8080/api/misdemeanours/30", () => {
      return HttpResponse.error();
    });

    server.use(get);

    render(<App />);
    const error = await screen.findByText("ERROR: Server is not running!");
    expect(error).toBeInTheDocument();
  });
});

const data: Misdemeanour[] = [
  {
    citizenId: 292,
    misdemeanour: "vegetables",
    date: "26/12/2023",
  },
  {
    citizenId: 9574,
    misdemeanour: "rudeness",
    date: "26/12/2023",
  },
  {
    citizenId: 2779,
    misdemeanour: "lift",
    date: "26/12/2023",
  },
  {
    citizenId: 2203,
    misdemeanour: "united",
    date: "26/12/2023",
  },
  {
    citizenId: 1,
    misdemeanour: "united",
    date: "26/12/2023",
    details: "losers",
  },
];
