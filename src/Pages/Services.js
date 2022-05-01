import React from "react";
import { LayoutDefault } from "../Layouts/LayoutDefault";

export const Services = ({ title, type }) => {
  return (
    <LayoutDefault title={title} type={type}>
      <section>
        <div className="container">
          <h3>{title}</h3>
        </div>
      </section>
    </LayoutDefault>
  );
};
