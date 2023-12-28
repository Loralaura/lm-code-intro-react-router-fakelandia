import React, { useContext, useState } from "react";
import {
  MISDEMEANOURS,
  Misdemeanour,
  MisdemeanourKind,
} from "../types/misdemeanours.types";
import { Dropdown } from "../components/Dropdown/Dropdown";
import "./Misdemeanours.css";
import { MisdemeanoursContext } from "../App";

export function Misdemeanours() {
  return (
    <div className="misdemeanours" data-testid="misdemeanours">
      <h2>Misdemeanours</h2>
      <div className="list">
        <MisdemeanourTable />
      </div>
    </div>
  );
}

function MisdemeanourTable() {
  const { misdemeanours } = useContext(MisdemeanoursContext);
  const [selection, setSelection] = useState<MisdemeanourKind>(
    MISDEMEANOURS[0]
  );
  return (
    <table>
      <thead>
        <tr>
          <th>Citizen ID</th>
          <th>Date</th>
          <th>
            Misdemeanour
            <Dropdown
              onChange={(v) => setSelection(v as any)}
              value={selection}
              options={MISDEMEANOURS as any}
            />
          </th>
          <th>Punishment Idea</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        {misdemeanours
          ?.filter((m) => m.misdemeanour === selection)
          .map((x) => misdemeanourRow(x))}
      </tbody>
    </table>
  );
}

function misdemeanourRow(misdemeanours: Misdemeanour) {
  const self = misdemeanours.details ? "self-misdemeanour" : "";
  return (
    <tr
      key={misdemeanours.citizenId}
      data-testid="misdemeanour"
      className={self}
    >
      <td data-testid="citizenId">{misdemeanours.citizenId}</td>
      <td data-testid="date">{misdemeanours.date}</td>
      <td data-testid="misdemeanour-emoji">
        {applyEmoji(misdemeanours.misdemeanour)}
      </td>
      <td>
        <img
          data-testid="punishment-idea"
          src={`https://picsum.photos/100/100/?random=${misdemeanours.citizenId}`}
          alt=""
        />
      </td>
      <td data-testid="details">{misdemeanours.details}</td>
    </tr>
  );
}

export function applyEmoji(misdemeanour: MisdemeanourKind) {
  switch (misdemeanour) {
    case "rudeness":
      return `${misdemeanour}🤪`;
    case "lift":
      return `${misdemeanour}🗣`;
    case "vegetables":
      return `${misdemeanour}🥗`;
    case "united":
      return `${misdemeanour}😈`;
    default:
      return misdemeanour;
  }
}
