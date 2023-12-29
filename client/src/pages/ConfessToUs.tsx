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
  if (x === "just-talk") return { value: x, label: " just want to talk" };
  return { value: x, label: x };
});

export function ConfessToUs() {
  const { misdemeanours, setMisdemeanours } = useContext(MisdemeanoursContext);
  const [reason, setReason] = useState<Reason>(REASONS[0]);
  const [subject, setSubject] = useState("");
  const [details, setDetails] = useState("");
  const [response, setResponse] = useState<ConfessResponse>();

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
    <div className="confess-to-us">
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
            id="subject"
            type="text"
            value={subject}
            onChange={(v) => setSubject(v.currentTarget.value)}
          />
        </div>
        <div className="row">
          <label htmlFor="subject">Reason for contact:</label>
          <Dropdown
            id="subject"
            onChange={(v) => setReason(v as Reason)}
            value={reason}
            options={OPTIONS}
          />
        </div>
        <textarea
          value={details}
          onChange={(v) => setDetails(v.currentTarget.value)}
        />
        <button onClick={onSubmit}>Confess</button>
        {response?.success === false && (
          <div>Confess Failed: {response?.message}</div>
        )}
        {response?.success === true && <div>Confess Success</div>}
      </div>
    </div>
  );
}
