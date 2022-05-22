import React, { useEffect, useState } from "react";
import "./Map.scss";
import sanityClient from "../Client";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";

function SetMarkers(props) {
  const { locations } = props;
  const map = useMap();
  const markersArr = [];

  locations &&
    locations.forEach((location) => {
      markersArr.push(location.marker);
    });

  map.fitBounds(markersArr);

  return (
    <>
      {markersArr.map((marker, index) => (
        <Marker position={[marker.lat, marker.lng]} key={index}>
          <Popup>{(marker.lat, marker.lng)}</Popup>
        </Marker>
      ))}
    </>
  );
}

export const Map = (props) => {
  const [locations, setLocations] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "locations"]{
      title,
      marker,
    }`
      )
      .then((data) => {
        setLocations(data);
      })
      .catch(console.error);
  }, []);

  const defaultCenter = props.component.center;

  return (
    <div className="Map" id={props.component._key}>
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

          {locations && <SetMarkers locations={locations} />}
        </MapContainer>
      </div>
    </div>
  );
};
