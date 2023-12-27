import React from "react";
import { Link } from "react-router-dom";

export function NoMatch() {
  return (
    <div className="404">
      <h2>404</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
