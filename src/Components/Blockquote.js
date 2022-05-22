import React from "react";
import "./Blockquote.scss";

export const Blockquote = (props) => {
  return (
    <div
      id={props.component._key}
      className="Blockquote full-width"
      style={{ backgroundColor: props.component.hexCode }}
    >
      <blockquote>
        {props.component.quote}
        <span>{props.component.author}</span>
      </blockquote>
    </div>
  );
};
