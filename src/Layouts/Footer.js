import React, { useState, useEffect } from "react";
import SocialMedia from "../Components/SocialMedia";
import { Link } from "react-router-dom";
import sanityClient from "../Client";
import "./Footer.scss";
import { decodeHtml } from "../helpers";

export const Footer = () => {
  const [footerNav, setFooterNav] = useState(null);
  const [siteInfo, setSiteInfo] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "siteSettings"]{
          footerNav[]->{
            _id,
            slug,
            title,
          },
          title
        }`
      )
      .then((data) => {
        data[0]?.footerNav && setFooterNav(data[0].footerNav);
        data[0]?.title && setSiteInfo(data[0].title);
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <div className="Footer">
        <div className="container">
          <div className="Footer__navigation">
            <ul>
              {footerNav &&
                footerNav.map((page, index) => (
                  <li key={index}>
                    <Link
                      to={"/" + page.slug?.current}
                      href={"/" + page.slug?.current}
                    >
                      {page.title}
                    </Link>
                  </li>
                ))}
            </ul>
            <SocialMedia />
          </div>
          <div className="Footer__copywrite">
            <small>
              {siteInfo ? `Copyright ${decodeHtml("&copy;")} ${siteInfo}` : ""}
            </small>
          </div>
        </div>
      </div>
    </>
  );
};
