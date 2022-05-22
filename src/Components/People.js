import React, { useEffect, useState } from "react";
import { LayoutDefault } from "../Layouts/LayoutDefault";
import sanityClient from "../Client";
import { PersonCard } from "./PersonCard";

export const People = ({ title, type }) => {
  const [people, setPeople] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "people"]{
      name,
      slug,
      description,
      image,
    }`
      )
      .then((data) => {
        setPeople(data);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="People">
      <h3>{title}</h3>
      <div>
        {people &&
          people.map((person, index) => (
            <PersonCard key={index} person={person} />
          ))}
      </div>
    </div>
  );
};
