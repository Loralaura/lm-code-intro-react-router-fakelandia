import React, { useCallback, useContext, useMemo, useState } from "react";
import { Dropdown, Option } from "../components/Dropdown/Dropdown";
import { MisdemeanourKind } from "../types/misdemeanours.types";
import "./ConfessToUs.css";
import axios from "axios";
import { MisdemeanoursContext } from "../App";
import {
  ConfessResponse,
  PostData,
  REASONS,
  Reason,
} from "../types/request.types";

const OPTIONS: Option[] = REASONS.map((x) => {
  if (x === "just-talk") return { value: x, label: "I just want to talk" };
  return { value: x, label: x };
});

export function ConfessToUs() {
  const { misdemeanours, setMisdemeanours } = useContext(MisdemeanoursContext);
  const [reason, setReason] = useState<Reason>(REASONS[0]);
  const [subject, setSubject] = useState("");
  const [details, setDetails] = useState("");
  const [response, setResponse] = useState<ConfessResponse>();

  const canConfess = useMemo(() => {
    if (!reason || reason.trim() === "") return true;
    if (!subject || subject.trim() === "") return true;
    if (!details || details.trim() === "") return true;

    return false;
  }, [reason, details, subject]);

  const onSubmit = useCallback(() => {
    async function submit() {
      const data: PostData = {
        subject,
        details,
        reason,
      };
      try {
        const response = await axios.post<ConfessResponse>(
          "http://localhost:8080/api/confess",
          data
        );

        setResponse(response.data);

        if (response.data.success && !response.data.justTalked) {
          const date = new Date();
          setMisdemeanours([
            ...misdemeanours,
            {
              citizenId: date.getTime(),
              date: date.toLocaleDateString(),
              misdemeanour: reason as MisdemeanourKind,
              details: details,
            },
          ]);
        }
      } catch (error) {
        setResponse({
          success: false,
          justTalked: false,
          message: "ERROR: Server is not running!",
        });
      }
    }
    setSubject("");
    setReason(REASONS[0]);
    setDetails("");
    setResponse(undefined);
    submit();
  }, [reason, subject, details]);

  return (
    <div className="confess-to-us" data-testid="confess-to-us">
      <p>
        It's very difficult to catch people committing misdemeanours so we
        appreciate it when citizens confess to us directly.
      </p>
      <p>
        However, if you're just having a hard day and need to vent then you're
        welcome to contact us here too. Up to you!
      </p>
      <div className="form">
        <div className="row">
          <label htmlFor="subject">Subject:</label>
          <input
            className={validation(subject) ? "valid" : "invalid"}
            id="subject"
            type="text"
            value={subject}
            placeholder="Provide a subject..."
            onChange={(v) => setSubject(v.currentTarget.value)}
            data-testid="subject"
          />
          {!validation(subject) && (
            <label className="invalidMessage" data-testid="subject-error">
              Subject is required
            </label>
          )}
        </div>
        <div className="row">
          <label htmlFor="reason">Reason for contact:</label>
          <Dropdown
            id="reason"
            onChange={(v) => setReason(v as Reason)}
            value={reason}
            options={OPTIONS}
            data-testid="reason"
          />
        </div>
        <label>Detail:</label>
        {!validation(details) && (
          <label className="invalidMessage" data-testid="details-error">
            Details is required
          </label>
        )}
        <textarea
          className={validation(details) ? "valid" : "invalid"}
          value={details}
          placeholder="Provide some details..."
          onChange={(v) => setDetails(v.currentTarget.value)}
          data-testid="details"
        />
        <button disabled={canConfess} onClick={onSubmit} data-testid="confess">
          Confess
        </button>
        {response?.success === false && (
          <div data-testid="failed">Confess Failed: {response?.message}</div>
        )}
        {response?.success === true && (
          <div data-testid="success">Confess Success</div>
        )}
      </div>
    </div>
  );
}

function validation(value: string) {
  return value !== undefined && value.trim() !== "";
}
