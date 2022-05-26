import React from "react";
import "./PageBanner.scss";
import { urlFor } from "../helpers";

export const PageBanner = ({ props }) => {
  const bannerImageURL = props.mainImage ? urlFor(props.mainImage).url() : "";
  return (
    <div
      className="PageBanner full-width"
      style={{
        backgroundImage: bannerImageURL
          ? "url(" + bannerImageURL + ")"
          : "none",
      }}
    >
      {props.pageType === "index" ? (
        <div className="PageBanner__hero">
          <div className="PageBanner__text">
            <h1 className="PageBanner__text--title">{props.title}</h1>
            {props.subtitle ? (
              <p className="PageBanner__text--subtitle">{props.subtitle}</p>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        <div className="PageBanner__skinny">
          <div className="PageBanner__text">
            <h2 className="PageBanner__text--title">{props.title}</h2>
            {props.subtitle ? (
              <h3 className="PageBanner__text--subtitle">{props.subtitle}</h3>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
      <div className="PageBanner__overlay"></div>
    </div>
  );
};
