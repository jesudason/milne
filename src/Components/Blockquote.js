import React from "react";
import "./Blockquote.scss";
import variables from "../variables.scss";

export const Blockquote = (props) => {
  console.log("Blockquote", props.component);
  return (
    <div
      id={props.component._key}
      className="Blockquote full-width"
      style={{ backgroundColor: variables[props.component.backgroundColor] }}
    >
      <blockquote
        style={{
          color:
            props.component.backgroundColor === "white" ||
            props.component.backgroundColor === "tertiary"
              ? variables.black
              : variables.white,
        }}
      >
        {props.component.quote}
        <span>{props.component.author}</span>
      </blockquote>
    </div>
  );
};
