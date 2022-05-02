import React, { useEffect, useState } from "react";
import { LayoutDefault } from "../Layouts/LayoutDefault";
import sanityClient from "../Client";
import { useParams } from "react-router-dom";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";

const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return builder.image(source);
}

export const Person = () => {
  const [personData, setPersonData] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    sanityClient
      .fetch(
        `*[slug.current == $slug]{
            name, 
            slug, 
            image{
                asset->{
                    _id,
                    url
                }
            }, 
            body,
        }`,
        { slug }
      )
      .then((data) => {
        setPersonData(data[0]);
      })
      .catch(console.error);
  }, [slug]);

  if (!personData) return <div>Loading...</div>;
  return (
    <LayoutDefault props={{ title: personData.name, type: "content" }}>
      <section>
        <div className="container">
          {personData.image && (
            <img
              src={urlFor(personData.image.asset).width(100).height(100).url()}
              alt="Image example"
            />
          )}
          <div>
            <PortableText value={[personData.body]} />
          </div>
        </div>
      </section>
    </LayoutDefault>
  );
};
