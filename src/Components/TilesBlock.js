import { Row, Col, Card } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { urlFor, hexToRgbA, matchSlugs } from "../helpers";
import sanityClient from "../Client";
import "./TilesBlock.scss";

function TileCard(props) {
  const image = props.image;
  // console.log("image", image);
  const heading = props.heading;
  const text = props.text;
  const hex = props.hex;

  return (
    <Card
      style={{
        "--box-shadow": hex && ` 0 2px 7px ${hexToRgbA(hex, 0.25)}`,
        "--hover-shadow": hex && ` 0 4px 12px ${hexToRgbA(hex, 0.45)}`,
      }}
    >
      {image && <Card.Img src={urlFor(image).width(120).url()} />}
      <Card.Body>
        {heading && <Card.Title>{heading}</Card.Title>}
        {text && <Card.Text>{text}</Card.Text>}
      </Card.Body>
    </Card>
  );
}

export const TilesBlock = (props) => {
  const component = props.component;
  const [pages, setPages] = useState(null);
  const slugs = [
    component.url1?._ref,
    component.url2?._ref,
    component.url3?._ref,
  ];
  const colors = [
    component.hexColour1,
    component.hexColour2,
    component.hexColour3,
  ];
  const headings = [
    component.tileHeading1,
    component.tileHeading2,
    component.tileHeading3,
  ];
  const images = [component.image1, component.image2, component.image3];

  const tileTexts = [
    component.tileText1,
    component.tileText2,
    component.tileText3,
  ];

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "pages"]{
            _id,
            slug,
        }`
      )
      .then((data) => {
        setPages(data);
      })
      .catch(console.error);
  }, []);

  pages &&
    pages.forEach((page) => {
      if (slugs.includes(page._id)) {
        const objIndex = slugs.indexOf(page._id);
        slugs[objIndex] = page.slug.current;
      }
    });

  return (
    <div className="TilesBlock" id={props.component._key}>
      <Row xs={1} lg={3}>
        {Array.from({ length: 3 }).map((_, idx) =>
          !!slugs[idx] ? (
            <Col key={idx}>
              <a href={`./${slugs[idx]}`}>
                <TileCard
                  hex={colors[idx]}
                  heading={headings[idx]}
                  text={tileTexts[idx]}
                  image={images[idx]}
                />
              </a>
            </Col>
          ) : (
            <Col key={idx}>
              <TileCard
                hex={colors[idx]}
                heading={headings[idx]}
                text={tileTexts[idx]}
                image={images[idx]}
              />
            </Col>
          )
        )}
      </Row>
    </div>
  );
};
