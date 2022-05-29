import React from "react";
import "./PageBanner.scss";
import { urlFor } from "../helpers";

export const PageBanner = ({ props }) => {
  const bannerImageURL = props.mainImage ? urlFor(props.mainImage).url() : "";
  return (
    <div className="PageBanner">
      {props.pageType === "index" ? (
        <section className="hero-banner">
          <div
            className="hero-banner__background"
            style={{
              backgroundImage: bannerImageURL
                ? "url(" + bannerImageURL + ")"
                : "none",
            }}
          >
            <span className="hero-banner__background-blur"></span>
          </div>
          <div className="hero-banner__text">
            <div className="container">
              <h1 className="PageBanner__text--title">{props.title}</h1>
              {props.subtitle ? (
                <p className="PageBanner__text--subtitle">{props.subtitle}</p>
              ) : (
                ""
              )}
            </div>
          </div>
        </section>
      ) : (
        <section className="banner banner__type-skinny">
          <div className="container">
            <div
              className="banner__background"
              style={{
                backgroundImage: bannerImageURL
                  ? "url(" + bannerImageURL + ")"
                  : "none",
              }}
            ></div>
            <div className="banner__details">
              <h1 className="PageBanner__text--title">{props.title}</h1>
              {props.subtitle ? (
                <h2 className="PageBanner__text--subtitle">{props.subtitle}</h2>
              ) : (
                ""
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
