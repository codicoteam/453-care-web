import React, { useEffect, useState } from "react";

const GoogleMapComponent = () => {
  const [location, setLocation] = useState(null);

  // Function to fetch location data from your backend
  const fetchLocation = async () => {
    try {
      // Replace with your backend API URL
      const response = await fetch("https://your-backend-api.com/location");
      const data = await response.json();

      // Assuming the response contains { latitude, longitude }
      setLocation(data);
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  // Check if location data is available before rendering the map
  if (!location) {
    return <div>Loading map...</div>;
  }

  // Dynamically construct the Google Maps embed URL with latitude and longitude
  const googleMapsUrl = `https://www.google.com/maps/embed/v1/place?q=${location.latitude},${location.longitude}&key=YOUR_GOOGLE_MAPS_API_KEY`;

  return (
    <div
      style={{
        overflow: "hidden",
        resize: "none",
        maxWidth: "100%",
        width: "500px",
        height: "500px",
      }}
    >
      <div
        id="embed-ded-map-canvas"
        style={{
          height: "100%",
          width: "100%",
          maxWidth: "100%",
        }}
      >
        <iframe
          style={{
            height: "100%",
            width: "100%",
            border: "0",
          }}
          frameBorder="0"
          src={googleMapsUrl}
        ></iframe>
      </div>
      <a
        className="google-map-code-enabler"
        href="https://www.bootstrapskins.com/themes"
        id="make-map-data"
      >
        premium bootstrap themes
      </a>
    </div>
  );
};

export default GoogleMapComponent;
