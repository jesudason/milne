import React, { FC } from "react";
import { PageBanner } from "../Components/PageBanner";

export const LayoutDefault = ({ children, props }) => {
  return (
    <div className="LayoutDefault">
      <PageBanner title={props.title || props.name} type={props.type} />
      <>{children}</>
    </div>
  );
};
