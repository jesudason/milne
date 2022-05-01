import React from "react";

export const PageBanner = ({ title, type }) => {
  return (
    <>
      <section className={`${type == "index" ? "bgimage" : ""}`}>
        <div className="py-5 text-center container">
          <div className="row py-lg-5">
            <div className="col-lg-6 col-md-8 mx-auto">
              <h1 className="fw-light">
                {title} {type == "index" ? "bgimage" : "false"}
              </h1>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
