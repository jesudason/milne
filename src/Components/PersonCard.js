import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import sanityClient from "../Client";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return builder.image(source);
}

export const PersonCard = ({ person }) => {
  return (
    <>
      <Card style={{ width: "18rem" }}>
        {person.image && (
          <Card.Img
            variant="top"
            src={urlFor(person.image.asset).width(100).height(100).url()}
          />
        )}
        <Card.Body>
          <Card.Title>{person.name}</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>{" "}
          <Link
            to={"/people/" + person.slug.current}
            key={person.slug.current}
            props={person}
          >
            <Button variant="primary" person={person}>
              Go somewhere
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </>
  );
};
