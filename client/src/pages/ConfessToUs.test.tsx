import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ConfessToUs } from "./ConfessToUs";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import "@testing-library/jest-dom";
import { MisdemeanoursContext } from "../App";
import { Misdemeanour } from "../types/misdemeanours.types";

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("ConfessToUs", () => {
  test("renders ConfessToUs", () => {
    const setMisdemeanours = jest.fn();

    render(
      <MisdemeanoursContext.Provider
        value={{
          misdemeanours: data,
          setMisdemeanours,
        }}
      >
        <ConfessToUs />
      </MisdemeanoursContext.Provider>
    );
    const element = screen.getByTestId("confess-to-us");
    expect(element).toBeInTheDocument();

    const subject = screen.getByTestId("subject") as HTMLInputElement;
    expect(subject.value).toBe("");

    const subjectError = screen.getByTestId("subject-error");
    expect(subjectError).toBeInTheDocument();

    const reason = screen.getByTestId("dropdown") as HTMLInputElement;
    expect(reason).toBeInTheDocument();
    expect(reason.value).toBe("rudeness");

    const reasonOptions = screen.getAllByTestId("dropdown-option");
    expect(reasonOptions.length).toEqual(5);

    const details = screen.getByTestId("details") as HTMLInputElement;
    expect(details.value).toBe("");

    const detailsError = screen.getByTestId("details-error");
    expect(detailsError).toBeInTheDocument();

    const confess = screen.getByTestId("confess");
    expect(confess).toBeInTheDocument();
    expect(confess).toBeDisabled();

    const failed = screen.queryByTestId("failed");
    expect(failed).toBeNull();

    const success = screen.queryByTestId("success");
    expect(success).toBeNull();
  });

  test("should be invalid without details", () => {
    const setMisdemeanours = jest.fn();

    render(
      <MisdemeanoursContext.Provider
        value={{
          misdemeanours: data,
          setMisdemeanours,
        }}
      >
        <ConfessToUs />
      </MisdemeanoursContext.Provider>
    );
    const subject = screen.getByTestId("subject") as HTMLInputElement;
    expect(subject.value).toBe("");
    const subjectError = screen.getByTestId("subject-error");
    expect(subjectError).toBeInTheDocument();
    const details = screen.getByTestId("details") as HTMLInputElement;
    expect(details.value).toBe("");
    const detailsError = screen.getByTestId("details-error");
    expect(detailsError).toBeInTheDocument();
    const confess = screen.getByTestId("confess");
    expect(confess).toBeDisabled();
  });

  test("should be invalid without subject", () => {
    const setMisdemeanours = jest.fn();

    render(
      <MisdemeanoursContext.Provider
        value={{
          misdemeanours: data,
          setMisdemeanours,
        }}
      >
        <ConfessToUs />
      </MisdemeanoursContext.Provider>
    );
    const subject = screen.getByTestId("subject") as HTMLInputElement;
    expect(subject.value).toBe("");
    const subjectError = screen.queryByTestId("subject-error");
    expect(subjectError).toBeInTheDocument();
    const details = screen.getByTestId("details") as HTMLInputElement;
    fireEvent.change(details, {
      target: { value: "details" },
    });
    expect(details.value).toBe("details");
    const detailsError = screen.queryByTestId("details-error");
    expect(detailsError).toBeNull();
    const confess = screen.getByTestId("confess");
    expect(confess).toBeDisabled();
  });

  test("should be a valid confession", () => {
    const setMisdemeanours = jest.fn();

    render(
      <MisdemeanoursContext.Provider
        value={{
          misdemeanours: data,
          setMisdemeanours,
        }}
      >
        <ConfessToUs />
      </MisdemeanoursContext.Provider>
    );
    const subject = screen.getByTestId("subject") as HTMLInputElement;
    fireEvent.change(subject, {
      target: { value: "subject" },
    });
    expect(subject.value).toBe("subject");

    const subjectError = screen.queryByTestId("subject-error");
    expect(subjectError).toBeNull();

    const details = screen.getByTestId("details") as HTMLInputElement;
    fireEvent.change(details, {
      target: { value: "details" },
    });
    expect(details.value).toBe("details");

    const detailsError = screen.queryByTestId("details-error");
    expect(detailsError).toBeNull();

    const confess = screen.getByTestId("confess");
    expect(confess).not.toBeDisabled();
  });

  test("should succeed in confessing", async () => {
    const post = http.post(
      "http://localhost:8080/api/confess",
      async ({ request }) => {
        const data = await request.json();
        expect(data).toEqual({
          details: "details",
          reason: "rudeness",
          subject: "subject",
        });
        return HttpResponse.json({
          success: true,
          justTalked: false,
          message: "",
        });
      }
    );

    server.use(post);
    const setMisdemeanours = jest.fn();

    render(
      <MisdemeanoursContext.Provider
        value={{
          misdemeanours: data,
          setMisdemeanours,
        }}
      >
        <ConfessToUs />
      </MisdemeanoursContext.Provider>
    );
    const subject = screen.getByTestId("subject") as HTMLInputElement;
    fireEvent.change(subject, {
      target: { value: "subject" },
    });
    const details = screen.getByTestId("details") as HTMLInputElement;
    fireEvent.change(details, {
      target: { value: "details" },
    });
    const confess = screen.getByTestId("confess");
    expect(confess).not.toBeDisabled();
    fireEvent.click(confess);

    await waitFor(() => {
      const success = screen.queryByTestId("success");
      expect(success).toBeInTheDocument();
    });

    await waitFor(() => {
      const failed = screen.queryByTestId("failed");
      expect(failed).toBeNull();
    });

    await waitFor(() => {
      const exp = [
        ...data,
        {
          citizenId: expect.any(Number),
          date: new Date().toLocaleDateString(),
          misdemeanour: "rudeness",
          details: "details",
        },
      ];
      expect(setMisdemeanours).toHaveBeenCalledWith(
        expect.arrayContaining(exp)
      );
    });
  });

  test("should succeed with just-talk option", async () => {
    const post = http.post(
      "http://localhost:8080/api/confess",
      async ({ request }) => {
        const data = await request.json();
        expect(data).toEqual({
          details: "details",
          reason: "just-talk",
          subject: "subject",
        });
        return HttpResponse.json({
          success: true,
          justTalked: true,
          message: "",
        });
      }
    );

    server.use(post);
    const setMisdemeanours = jest.fn();

    render(
      <MisdemeanoursContext.Provider
        value={{
          misdemeanours: data,
          setMisdemeanours,
        }}
      >
        <ConfessToUs />
      </MisdemeanoursContext.Provider>
    );
    fireEvent.change(screen.getByTestId("dropdown"), {
      target: { value: "just-talk" },
    });
    const subject = screen.getByTestId("subject") as HTMLInputElement;
    fireEvent.change(subject, {
      target: { value: "subject" },
    });
    const details = screen.getByTestId("details") as HTMLInputElement;
    fireEvent.change(details, {
      target: { value: "details" },
    });
    const confess = screen.getByTestId("confess");
    expect(confess).not.toBeDisabled();
    fireEvent.click(confess);

    await waitFor(() => {
      const success = screen.queryByTestId("success");
      expect(success).toBeInTheDocument();
    });

    await waitFor(() => {
      const failed = screen.queryByTestId("failed");
      expect(failed).toBeNull();
    });

    await waitFor(() => {
      expect(setMisdemeanours).toHaveBeenCalledTimes(0);
    });
  });

  test("should fail confession", async () => {
    const post = http.post("http://localhost:8080/api/confess", () => {
      return HttpResponse.json({
        success: false,
        justTalked: false,
        message: "Error",
      });
    });

    server.use(post);
    const setMisdemeanours = jest.fn();

    render(
      <MisdemeanoursContext.Provider
        value={{
          misdemeanours: data,
          setMisdemeanours,
        }}
      >
        <ConfessToUs />
      </MisdemeanoursContext.Provider>
    );
    const subject = screen.getByTestId("subject") as HTMLInputElement;
    fireEvent.change(subject, {
      target: { value: "subject" },
    });
    const details = screen.getByTestId("details") as HTMLInputElement;
    fireEvent.change(details, {
      target: { value: "details" },
    });
    const confess = screen.getByTestId("confess");
    expect(confess).not.toBeDisabled();
    fireEvent.click(confess);

    await waitFor(() => {
      const success = screen.queryByTestId("success");
      expect(success).toBeNull();
    });

    await waitFor(() => {
      const failed = screen.queryByTestId("failed");
      expect(failed).toHaveTextContent("Confess Failed: Error");
    });

    await waitFor(() => {
      expect(setMisdemeanours).toHaveBeenCalledTimes(0);
    });
  });

  test("should fail - server down", async () => {
    const post = http.post("http://localhost:8080/api/confess", () => {
      return HttpResponse.error();
    });

    server.use(post);
    const setMisdemeanours = jest.fn();

    render(
      <MisdemeanoursContext.Provider
        value={{
          misdemeanours: data,
          setMisdemeanours,
        }}
      >
        <ConfessToUs />
      </MisdemeanoursContext.Provider>
    );
    const subject = screen.getByTestId("subject") as HTMLInputElement;
    fireEvent.change(subject, {
      target: { value: "subject" },
    });
    const details = screen.getByTestId("details") as HTMLInputElement;
    fireEvent.change(details, {
      target: { value: "details" },
    });
    const confess = screen.getByTestId("confess");
    expect(confess).not.toBeDisabled();
    fireEvent.click(confess);

    await waitFor(() => {
      const success = screen.queryByTestId("success");
      expect(success).toBeNull();
    });

    await waitFor(() => {
      const failed = screen.queryByTestId("failed");
      expect(failed).toHaveTextContent(
        "Confess Failed: ERROR: Server is not running!"
      );
    });

    await waitFor(() => {
      expect(setMisdemeanours).toHaveBeenCalledTimes(0);
    });
  });
});

const data: Misdemeanour[] = [
  {
    citizenId: 292,
    misdemeanour: "vegetables",
    date: "26/12/2023",
  },
];
