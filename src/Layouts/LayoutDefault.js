import React, { FC } from "react";
import { PortableText } from "@portabletext/react";
// import { PortableText } from "@sanity/block-content-to-react";
import { PageBanner } from "./PageBanner";
import { People } from "../Components/People";
import { TextWithIllustration } from "../Components/TextWithIllustration";
import { Gallery } from "../Components/Gallery";
import { PersonCard } from "../Components/PersonCard";
import { ContactForm } from "../Components/Form";
import { Testimonials } from "../Components/Testimonials";
import { Blockquote } from "../Components/Blockquote";
import { TilesBlock } from "../Components/TilesBlock";
import { Map } from "../Components/Map";
import { Form } from "../Components/Form";
import { FeatureText } from "../Components/FeatureText";
import "../variables.scss";

const Components = {
  textWithIllustration: TextWithIllustration,
  gallery: Gallery,
  people: People,
  personCard: PersonCard,
  testimonials: Testimonials,
  blockquote: Blockquote,
  tilesBlock: TilesBlock,
  map: Map,
  form: Form,
  featureText: FeatureText,
};

const components = {
  marks: {
    internalLink: ({ value, children }) => {
      const { slug = {} } = value;
      const href = `/${slug.current}`;
      return <a href={href}>{children}</a>;
    },
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/")
        ? "external noreferrer noopener"
        : undefined;
      return (
        <a href={value.href} rel={rel} target="_blank">
          {children}
        </a>
      );
    },
    code: (props) => (
      <span dangerouslySetInnerHTML={{ __html: props.text }}></span>
    ),
  },
};

export const LayoutDefault = ({ props }) => {
  return (
    <div className="LayoutDefault">
      <div className="container">
        <PageBanner props={props} />
        {props?.content && (
          <div className="content">
            <PortableText value={props.content} components={components} />
          </div>
        )}
        {props.pageBuilder &&
          props.pageBuilder.map((component, index) => {
            if (typeof Components[component._type] !== "undefined") {
              return React.createElement(Components[component._type], {
                component: component,
                key: index,
              });
            }
          })}
      </div>
    </div>
  );
};
