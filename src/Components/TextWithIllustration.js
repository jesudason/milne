import React from "react";
import "./TextWithIllustration.scss";
import { PortableText } from "@portabletext/react";
import urlFor from "../helpers";

export const TextWithIllustration = (props) => {
  return (
    <>
      <div className="TextWithIllustration" id={props.component._key}>
        {props.component.heading && (
          <h2 className="TextWithIllustration__heading">
            {props.component.heading}
          </h2>
        )}
        <div
          className={`TextWithIllustration__container ${
            props.component.imagePlacement == "Left"
              ? "image-left"
              : "image-right"
          }`}
        >
          <div className="TextWithIllustration__section">
            <img
              src={urlFor(props.component.image)
                .auto("format")
                .fit("max")
                .width(420)
                .url()}
            />
            <small>{props.component.tagline}</small>
          </div>
          <div className="TextWithIllustration__section">
            <PortableText value={props.component.content} />
          </div>
        </div>
      </div>
    </>
  );
};
