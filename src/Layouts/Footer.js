import React, { useState, useEffect } from "react";
import SocialMedia from "../Components/SocialMedia";
import { Link } from "react-router-dom";
import sanityClient from "../Client";
import "./Footer.scss";

export const Footer = () => {
  const [footerNav, setFooterNav] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "siteSettings"]{
          footerNav[]->{
            _id,
            slug,
            title,
          }
        }`
      )
      .then((data) => {
        setFooterNav(data[0].footerNav);
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
            <small>Copyright &copy; Your Website</small>
          </div>
        </div>
      </div>
    </>
  );
};
