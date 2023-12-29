import React, { useContext, useState } from "react";
import { Dropdown, Option } from "../components/Dropdown/Dropdown";
import "./ConfessToUs.css";
import { REASONS, Reason } from "../types/request.types";

const OPTIONS: Option[] = REASONS.map((x) => {
  if (x === "just-talk") return { value: x, label: " just want to talk" };
  return { value: x, label: x };
});

export function ConfessToUs() {
  const [reason, setReason] = useState<Reason>(REASONS[0]);
  const [subject, setSubject] = useState("");
  const [details, setDetails] = useState("");

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
        <button>Confess</button>
      </div>
    </div>
  );
}
