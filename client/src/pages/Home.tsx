import React, { useContext } from "react";
import { MisdemeanoursContext } from "../App";

export function Home() {
  const { misdemeanours } = useContext(MisdemeanoursContext);

  return (
    <div data-testid="home">
      <p>Welcome to the home of the Justice Department of Fakelandia</p>
      <p>
        Here you can browse a list of recent misdemeanours committed by our
        citizens, or you can confess to your own misdemeanour
      </p>
      <p>{`Total Misdemeanours: ${misdemeanours?.length}`}</p>
    </div>
  );
}
