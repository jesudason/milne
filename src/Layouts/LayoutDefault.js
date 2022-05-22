import React, { FC } from "react";
import { PortableText } from "@portabletext/react";
import { PageBanner } from "./PageBanner";
import { People } from "../Components/People";
import { TextWithIllustration } from "../Components/TextWithIllustration";
import { Gallery } from "../Components/Gallery";
import { PersonCard } from "../Components/PersonCard";
import { ContactForm } from "../Components/ContactForm";
import { Testimonials } from "../Components/Testimonials";
import { Blockquote } from "../Components/Blockquote";
import { TilesBlock } from "../Components/TilesBlock";
import { Map } from "../Components/Map";

const Components = {
  textWithIllustration: TextWithIllustration,
  gallery: Gallery,
  people: People,
  personCard: PersonCard,
  form: ContactForm,
  testimonials: Testimonials,
  blockquote: Blockquote,
  tilesBlock: TilesBlock,
  map: Map,
};

export const LayoutDefault = ({ props }) => {
  return (
    <div className="LayoutDefault">
      <div className="container">
        <PageBanner props={props} />
        {props?.content && (
          <div className="content">
            <PortableText value={props.content} />
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
