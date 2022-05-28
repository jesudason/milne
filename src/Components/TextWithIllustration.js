import React, { useState, useEffect } from "react";
import "./TextWithIllustration.scss";
import { PortableText } from "@portabletext/react";
import { urlFor } from "../helpers";
import sanityClient from "../Client";

export const TextWithIllustration = (props) => {
  const component = props.component;
  const [pages, setPages] = useState(null);
  console.log("TextWithIllustration", component.callToActionBtn?._ref);
  const btnLinkRef = component.callToActionBtn?._ref;
  let slug = "";
  console.log("TextWithIllustration", component);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "pages"]{
            _id,
            slug,
        }`
      )
      .then((data) => {
        setPages(data);
      })
      .catch(console.error);
  }, []);

  pages &&
    pages.forEach((page) => {
      if (page._id === btnLinkRef) {
        slug = page.slug.current;
      }
    });

  console.log(slug);

  return (
    <>
      <div className="TextWithIllustration" id={props.component._key}>
        {component.heading && (
          <h2 className="TextWithIllustration__heading">
            {props.component.heading}
          </h2>
        )}
        <div
          className={`TextWithIllustration__container ${
            component.imagePlacement == "Left" ? "image-left" : "image-right"
          }`}
        >
          <div className="TextWithIllustration__section">
            <img
              src={urlFor(component.image)
                .auto("format")
                .fit("max")
                .width(420)
                .url()}
            />
            <small>{component.tagline}</small>
          </div>
          <div className="TextWithIllustration__section">
            <PortableText value={component.content} />
            {component.callToActionBtn ? (
              <div className="btn__wrapper">
                <a className="btn btn-primary" href={`./${slug}`}>
                  {component.btnText ? component.btnText : "Read More"}
                </a>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};
