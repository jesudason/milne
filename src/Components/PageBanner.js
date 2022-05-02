import React from "react";
import "./PageBanner.scss";

export const PageBanner = ({ title, type }) => {
  let subtitle = "";
  let image = "";
  return (
    <>
      {type == "index" ? (
        <section className="banner banner__hero">
          <h1 className="fw-light">{title}</h1>
        </section>
      ) : (
        <section className="banner banner__skinny">
          <div className="banner__text">
            <h2 className="banner__text--title">{title}</h2>
            {subtitle ? (
              <h3 className="banner__text--subtitle">{subtitle}</h3>
            ) : (
              ""
            )}
          </div>
          {image ? (
            <div className="banner__image">
              <img src="{image}" alt="" />
            </div>
          ) : (
            ""
          )}
          <h1 className="fw-light">{title}</h1>
        </section>
      )}
    </>
  );
};
