import { TelephoneFill, EnvelopeFill, Mailbox2 } from "react-bootstrap-icons";
import React, { useEffect, useState } from "react";
import "./Map.scss";
import sanityClient from "../Client";
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";

function SetMarkers(props) {
  const component = props.component;
  const locations = props.locations;
  const locationsToDisplay = [];
  const locationData = [];
  const markersArr = [];

  component.points.map((point) => {
    locationsToDisplay.push(point._ref);
  });

  locations &&
    locations.forEach((location) => {
      if (locationsToDisplay.includes(location._id)) {
        markersArr.push(location.marker);
        locationData.push(location);
      }
    });

  const map = useMap();
  markersArr.length > 0 && map.fitBounds(markersArr, { padding: [42, 42] });

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
              {locationData[index].title ? (
                <p>{locationData[index].title} </p>
              ) : (
                ""
              )}
              {locationData[index].address ? (
                <span className="popup__content">
                  <span className="popup__content--icon">
                    <Mailbox2 />
                  </span>
                  {locationData[index].address}
                </span>
              ) : (
                ""
              )}
              {locationData[index].phone ? (
                <span className="popup__content">
                  <span className="popup__content--icon">
                    <TelephoneFill />
                  </span>

                  <a href={`tel:${locationData[index].phone}`}>
                    {locationData[index].phone}
                  </a>
                </span>
              ) : (
                ""
              )}
              {locationData[index].email ? (
                <span className="popup__content">
                  <span className="popup__content--icon">
                    <EnvelopeFill />
                  </span>

                  <a href={`mailto:${locationData[index].email}`}>
                    {locationData[index].email}
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
  // console.log("props", props);
  const defaultCenter = component.center;
  const title = component.title;
  const [locations, setLocations] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "locations"]`)
      .then((data) => {
        setLocations(data);
      })
      .catch(console.error);
  }, []);
  // L.control.zoom(position, "topright");
  return (
    <div className="Map" id={component._key}>
      {title ? <h2>{title}</h2> : ""}
      <div className="Map__container">
        <MapContainer
          center={[defaultCenter.lat, defaultCenter.lng]}
          scrollWheelZoom={false}
          zoomControl={false}
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
          <ZoomControl position="bottomright" />
        </MapContainer>
      </div>
    </div>
  );
};
