import { TelephoneFill, EnvelopeFill, Mailbox2 } from "react-bootstrap-icons";
import React, { useEffect, useState } from "react";
import "./Map.scss";
import sanityClient from "../Client";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";

function SetMarkers(props) {
  const component = props.component;
  const locations = props.locations;
  const locationsToDisplay = [];
  const markersArr = [];

  component.points.map((point) => {
    locationsToDisplay.push(point._ref);
  });

  locations &&
    locations.forEach((location) => {
      if (locationsToDisplay.includes(location._id)) {
        markersArr.push(location.marker);
      }
    });

  const map = useMap();
  markersArr.length > 0 && map.fitBounds(markersArr, { padding: [24, 24] });

  return (
    <>
      {markersArr.length > 0 &&
        markersArr.map((marker, index) => (
          <Marker
            className="test-marker"
            position={[marker.lat, marker.lng]}
            key={index}
          >
            <Popup>
              {locations[index].title ? <p>{locations[index].title} </p> : ""}
              {locations[index].address ? (
                <span className="popup__content">
                  <span className="popup__content--icon">
                    <Mailbox2 />
                  </span>
                  {locations[index].address}{" "}
                </span>
              ) : (
                ""
              )}
              {locations[index].phone ? (
                <span className="popup__content">
                  <span className="popup__content--icon">
                    <TelephoneFill />
                  </span>

                  <a href={`tel:${locations[index].phone}`}>
                    {locations[index].phone}
                  </a>
                </span>
              ) : (
                ""
              )}
              {locations[index].email ? (
                <span className="popup__content">
                  <span className="popup__content--icon">
                    <EnvelopeFill />
                  </span>

                  <a href={`mailto:${locations[index].email}`}>
                    {locations[index].email}
                  </a>
                </span>
              ) : (
                ""
              )}
            </Popup>
          </Marker>
        ))}
    </>
  );
}

export const Map = (props) => {
  const component = props.component;
  const defaultCenter = component.center;
  const [locations, setLocations] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "locations"]`)
      .then((data) => {
        setLocations(data);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="Map" id={component._key}>
      <h2>Map</h2>
      <div className="Map__container">
        <MapContainer
          center={[defaultCenter.lat, defaultCenter.lng]}
          zoom={3}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {component && locations ? (
            <SetMarkers component={component} locations={locations} />
          ) : (
            ""
          )}
        </MapContainer>
      </div>
    </div>
  );
};
