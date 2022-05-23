import React, { useState, useEffect } from "react";
// import "./SocialMedia.scss";
import sanityClient from "../Client";

export default function SocialMedia(props) {
  const [socialMedia, setSocialMedia] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "socials"]{
                socialMediaType,
        }`
      )
      .then((data) => {
        setSocialMedia(data);
        // console.log("socials", data);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="SocialMedia">
      <p>Socials</p>
      <ul></ul>
    </div>
  );
}
