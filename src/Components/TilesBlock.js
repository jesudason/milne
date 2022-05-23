import { Row, Col, Card } from "react-bootstrap";
import urlFor from "../helpers";
import "./TilesBlock.scss";

export const TilesBlock = (props) => {
  // console.log("TilesBlock");
  // console.log(props);

  function hexToRgbA(hex, opacity) {
    var c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split("");
      if (c.length == 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = "0x" + c.join("");
      return (
        "rgba(" +
        [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") +
        "," +
        opacity +
        ")"
      );
    }
    throw new Error("Bad Hex");
  }

  return (
    <div className="TilesBlock" id={props.component._key}>
      <Row xs={1} lg={3}>
        {Array.from({ length: 3 }).map((_, idx) => (
          <Col key={idx}>
            <Card
              style={{
                "--box-shadow":
                  eval("props.component.hexColour" + (idx + 1)) &&
                  ` 0 0 11px ${hexToRgbA(
                    eval("props.component.hexColour" + (idx + 1)),
                    0.25
                  )}`,
                "--hover-shadow":
                  eval("props.component.hexColour" + (idx + 1)) &&
                  ` 0 0 11px ${hexToRgbA(
                    eval("props.component.hexColour" + (idx + 1)),
                    0.55
                  )}`,
                border: eval("props.component.hexColour" + (idx + 1))
                  ? `1px solid ${hexToRgbA(
                      eval("props.component.hexColour" + (idx + 1)),
                      0.125
                    )}`
                  : `1px solid #fff`,
              }}
            >
              {eval("props.component.image" + (idx + 1)) && (
                <Card.Img
                  src={urlFor(eval("props.component.image" + (idx + 1)))
                    .width(120)
                    .url()}
                />
              )}
              <Card.Body>
                <Card.Title>
                  {eval("props.component.tileHeading" + (idx + 1))}
                </Card.Title>
                <Card.Text>
                  {eval("props.component.tileText" + (idx + 1))}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};
