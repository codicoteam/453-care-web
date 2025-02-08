import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const UserLocationMap = ({ visit }) => {
  const latitude = visit?.location?.latitude ?? 0; // Ensure fallback values
  const longitude = visit?.location?.longitude ?? 0;
  const address = visit?.location?.address ?? "No address provided";

  return (
    <div style={{ height: "300px", width: "100%" }}>
      <MapContainer
        center={[latitude, longitude]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[latitude, longitude]}>
          <Popup>
            <strong>Location:</strong> {address} <br />
            <strong>Latitude:</strong> {latitude} <br />
            <strong>Longitude:</strong> {longitude}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default UserLocationMap;