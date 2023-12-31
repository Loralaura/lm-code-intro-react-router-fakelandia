import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Misdemeanours, applyEmoji } from "./Misdemeanours";
import { MisdemeanoursContext } from "../App";
import { Misdemeanour } from "../types/misdemeanours.types";

describe("Misdemeanours", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render Misdemeanours with 1 rudeness", () => {
    const setMisdemeanours = jest.fn();

    render(
      <MisdemeanoursContext.Provider
        value={{
          misdemeanours: data,
          setMisdemeanours,
        }}
      >
        <Misdemeanours />
      </MisdemeanoursContext.Provider>
    );
    const home = screen.getByTestId("misdemeanours");
    expect(home).toBeInTheDocument();
    const misdemeanour = screen.getAllByTestId("misdemeanour");
    expect(misdemeanour.length).toEqual(1);
    const citizenId = within(misdemeanour[0]).getByTestId("citizenId");
    expect(citizenId).toHaveTextContent("9574");
    const date = within(misdemeanour[0]).getByTestId("date");
    expect(date).toHaveTextContent("26/12/2023");
    const misdemeanourEmoji = within(misdemeanour[0]).getByTestId(
      "misdemeanour-emoji"
    );
    expect(misdemeanourEmoji).toHaveTextContent(applyEmoji("rudeness"));
    const punishmentIdea = within(misdemeanour[0]).getByTestId(
      "punishment-idea"
    );
    expect(punishmentIdea).toBeInTheDocument();
    const details = within(misdemeanour[0]).getByTestId("details");
    expect(details).toHaveTextContent("");
  });

  test("should filter by vegetables", () => {
    const setMisdemeanours = jest.fn();

    render(
      <MisdemeanoursContext.Provider
        value={{
          misdemeanours: data,
          setMisdemeanours,
        }}
      >
        <Misdemeanours />
      </MisdemeanoursContext.Provider>
    );

    fireEvent.change(screen.getByTestId("dropdown"), {
      target: { value: "vegetables" },
    });
    const home = screen.getByTestId("misdemeanours");
    expect(home).toBeInTheDocument();
    const misdemeanour = screen.getAllByTestId("misdemeanour");
    expect(misdemeanour.length).toEqual(1);
    const citizenId = within(misdemeanour[0]).getByTestId("citizenId");
    expect(citizenId).toHaveTextContent("292");
    const date = within(misdemeanour[0]).getByTestId("date");
    expect(date).toHaveTextContent("26/12/2023");
    const misdemeanourEmoji = within(misdemeanour[0]).getByTestId(
      "misdemeanour-emoji"
    );
    expect(misdemeanourEmoji).toHaveTextContent(applyEmoji("vegetables"));
    const punishmentIdea = within(misdemeanour[0]).getByTestId(
      "punishment-idea"
    );
    expect(punishmentIdea).toBeInTheDocument();
    const details = within(misdemeanour[0]).getByTestId("details");
    expect(details).toHaveTextContent("");
  });

  test("should filter by lift", () => {
    const setMisdemeanours = jest.fn();

    render(
      <MisdemeanoursContext.Provider
        value={{
          misdemeanours: data,
          setMisdemeanours,
        }}
      >
        <Misdemeanours />
      </MisdemeanoursContext.Provider>
    );

    fireEvent.change(screen.getByTestId("dropdown"), {
      target: { value: "lift" },
    });
    const home = screen.getByTestId("misdemeanours");
    expect(home).toBeInTheDocument();
    const misdemeanour = screen.getAllByTestId("misdemeanour");
    expect(misdemeanour.length).toEqual(1);
    const citizenId = within(misdemeanour[0]).getByTestId("citizenId");
    expect(citizenId).toHaveTextContent("2779");
    const date = within(misdemeanour[0]).getByTestId("date");
    expect(date).toHaveTextContent("26/12/2023");
    const misdemeanourEmoji = within(misdemeanour[0]).getByTestId(
      "misdemeanour-emoji"
    );
    expect(misdemeanourEmoji).toHaveTextContent(applyEmoji("lift"));
    const punishmentIdea = within(misdemeanour[0]).getByTestId(
      "punishment-idea"
    );
    expect(punishmentIdea).toBeInTheDocument();
    const details = within(misdemeanour[0]).getByTestId("details");
    expect(details).toHaveTextContent("");
  });

  test("should filter by united", () => {
    const setMisdemeanours = jest.fn();

    render(
      <MisdemeanoursContext.Provider
        value={{
          misdemeanours: data,
          setMisdemeanours,
        }}
      >
        <Misdemeanours />
      </MisdemeanoursContext.Provider>
    );

    fireEvent.change(screen.getByTestId("dropdown"), {
      target: { value: "united" },
    });
    const home = screen.getByTestId("misdemeanours");
    expect(home).toBeInTheDocument();
    const misdemeanour = screen.getAllByTestId("misdemeanour");
    expect(misdemeanour.length).toEqual(2);

    const citizenId = within(misdemeanour[0]).getByTestId("citizenId");
    expect(citizenId).toHaveTextContent("2203");
    const date = within(misdemeanour[0]).getByTestId("date");
    expect(date).toHaveTextContent("26/12/2023");
    const misdemeanourEmoji = within(misdemeanour[0]).getByTestId(
      "misdemeanour-emoji"
    );
    expect(misdemeanourEmoji).toHaveTextContent(applyEmoji("united"));
    const punishmentIdea = within(misdemeanour[0]).getByTestId(
      "punishment-idea"
    );
    expect(punishmentIdea).toBeInTheDocument();
    const details = within(misdemeanour[0]).getByTestId("details");
    expect(details).toHaveTextContent("");

    const citizenId1 = within(misdemeanour[1]).getByTestId("citizenId");
    expect(citizenId1).toHaveTextContent("1");
    const date1 = within(misdemeanour[1]).getByTestId("date");
    expect(date1).toHaveTextContent("26/12/2023");
    const misdemeanourEmoji1 = within(misdemeanour[1]).getByTestId(
      "misdemeanour-emoji"
    );
    expect(misdemeanourEmoji1).toHaveTextContent(applyEmoji("united"));
    const punishmentIdea1 = within(misdemeanour[1]).getByTestId(
      "punishment-idea"
    );
    expect(punishmentIdea1).toBeInTheDocument();
    const details1 = within(misdemeanour[1]).getByTestId("details");
    expect(details1).toHaveTextContent("losers");
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
