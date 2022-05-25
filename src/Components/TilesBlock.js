import { Row, Col, Card } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { urlFor, hexToRgbA } from "../helpers";
import sanityClient from "../Client";
import "./TilesBlock.scss";

function TileCard(props) {
  const component = props.component;
  const index = props.idx;
  return (
    <Card
      style={{
        "--box-shadow":
          eval("component.hexColour" + index) &&
          ` 0 1px 2px ${hexToRgbA(eval("component.hexColour" + index), 0.2)}`,
        "--hover-shadow":
          eval("component.hexColour" + index) &&
          ` 0 4px 12px ${hexToRgbA(eval("component.hexColour" + index), 0.35)}`,
      }}
    >
      {eval("component.image" + index) && (
        <Card.Img
          src={urlFor(eval("component.image" + index))
            .width(120)
            .url()}
        />
      )}
      <Card.Body>
        <Card.Title>{eval("component.tileHeading" + index)}</Card.Title>
        <Card.Text>{eval("component.tileText" + index)}</Card.Text>
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
                <TileCard idx={idx + 1} component={component} />
              </a>
            </Col>
          ) : (
            <Col key={idx}>
              <TileCard idx={idx + 1} component={component} />
            </Col>
          )
        )}
      </Row>
    </div>
  );
};
