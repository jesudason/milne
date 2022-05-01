import React, { useEffect, useState } from "react";
import { LayoutDefault } from "../Layouts/LayoutDefault";
import sanityClient from "../Client";

export const About = ({ title, type }) => {
  return (
    <LayoutDefault props={{ title: title, type: type }}>
      <section>
        <div className="container">
          <h3>{title}</h3>
        </div>
      </section>
    </LayoutDefault>
  );
};
