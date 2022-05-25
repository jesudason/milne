import React from "react";
import "../variables.scss";

export const Buttons = (props) => {
  return (
    <div className="Buttons">
      <>
        <button className="btn btn-primary">Primary</button>
        <button className="btn btn-secondary">Secondary</button>
        <button className="btn btn-inverse">Inverse</button>
        <button className="btn btn-primary" disabled>
          Disabled
        </button>
        <button className="btn btn-link">Link</button>
      </>
      ;
    </div>
  );
};
