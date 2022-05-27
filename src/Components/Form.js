import React from "react";
import "./Form.scss";
import variables from "../variables.scss";

export const Form = (props) => {
  const component = props.component;
  console.log("props", props.component.backgroundColor);
  return (
    <>
      <div
        className="Form contact-form full-width"
        style={{
          backgroundColor: variables[props.component.backgroundColor],
          color:
            props.component.backgroundColor === "black" ||
            props.component.backgroundColor === undefined
              ? variables.white
              : variables.black,
        }}
      >
        {component.heading && <h2>{component.heading}</h2>}
        <form name="contact" method="post">
          <input type="hidden" name="form-name" value="contact" />
          <div className="input">
            <label htmlFor="name">Name</label> <br />
            <input type="text" id="name" name="name" required />
          </div>
          <div className="input">
            <label htmlFor="email">Email</label> <br />
            <input type="email" id="email" name="email" required />
          </div>
          <div className="textarea">
            <label htmlFor="message">Message</label> <br />
            <textarea id="message" name="message" required></textarea>
          </div>
          <div>
            <input
              className={
                props.component.backgroundColor === "white" ||
                props.component.backgroundColor === undefined
                  ? "btn btn-primary"
                  : "btn btn-inverse"
              }
              style={{
                color: variables[props.component.backgroundColor],
              }}
              type="submit"
              value="Submit message"
            />
          </div>
        </form>
      </div>
    </>
  );
};
