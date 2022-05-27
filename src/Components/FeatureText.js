import React from "react";
import "./FeatureText.scss";
import variables from "../variables.scss";

export const FeatureText = (props) => {
  console.log("FeatureText", props.component);

  return (
    <div
      id={props.component._key}
      className="FeatureText full-width"
      style={{ backgroundColor: variables[props.component.backgroundColor] }}
    >
      <p
        style={{
          color:
            props.component.backgroundColor === "white" ||
            props.component.backgroundColor === "tertiary"
              ? variables.black
              : variables.white,
        }}
      >
        {props.component.text}
      </p>
    </div>
  );
};
