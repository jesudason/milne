import React from "react";
import "./Form.scss";
import SocialMedia from "./SocialMedia";

export const Form = (props) => {
  return (
    <>
      <div className="Form contact-form full-width">
        <h2>Contact form</h2>
        <form name="contact" method="post">
          <input type="hidden" name="form-name" value="contact" />
          <p className="input">
            <label htmlFor="name">Name</label> <br />
            <input type="text" id="name" name="name" required />
          </p>
          <p className="input">
            <label htmlFor="email">Email</label> <br />
            <input type="email" id="email" name="email" required />
          </p>
          <p className="textarea">
            <label htmlFor="message">Message</label> <br />
            <textarea id="message" name="message" required></textarea>
          </p>
          <p>
            <input
              className="btn btn-inverse"
              type="submit"
              value="Submit message"
            />
          </p>
        </form>
      </div>
    </>
  );
};
