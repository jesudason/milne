import React, { useState, useEffect } from "react";
import "./SocialMedia.scss";
import sanityClient from "../Client";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaGitlab,
  FaInstagram,
  FaCodepen,
} from "react-icons/fa";

const platforms = {
  facebook: FaFacebook,
  twitter: FaTwitter,
  linkedin: FaLinkedin,
  github: FaGithub,
  gitlab: FaGitlab,
  instagram: FaInstagram,
  codepen: FaCodepen,
};

export default function SocialMedia(props) {
  const [socials, setSocials] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "siteSettings"]{
          socials[],
        }`
      )
      .then((data) => {
        setSocials(data[0].socials);
      })
      .catch(console.error);
  }, []);

  // console.log("socials", socials);

  return (
    <div className="SocialMedia">
      <ul>
        {socials &&
          socials.map((social, index) => {
            if (typeof platforms[social.platform] !== "undefined") {
              let icon = React.createElement(platforms[social.platform], {
                component: social.platform,
                key: index,
              });
              return (
                <li key={index}>
                  <a href={social.link} target="_blank">
                    {icon}
                  </a>
                </li>
              );
            }
          })}
      </ul>
    </div>
  );
}
