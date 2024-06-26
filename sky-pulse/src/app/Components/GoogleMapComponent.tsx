// components/GoogleMapComponent.tsx

import { GoogleMap, Polygon, useLoadScript } from "@react-google-maps/api";
import React, { useCallback, useRef } from "react";
import { GoogleMapComponentProps } from "./types";

const containerStyle = {
  width: "40vw",
  height: "40vh",
};

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({ coordinates, setCoordinates, forecastZoneGeometryCoordinates }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const mapRef = useRef<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    if (localStorage.getItem("mapCenter")) {
      setCoordinates(JSON.parse(localStorage.getItem("mapCenter")!));
    }
  }, []);

  const onClick = useCallback((event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const newCoordinates = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      setCoordinates(newCoordinates); // Pass the new coordinates
      localStorage.setItem("mapCenter", JSON.stringify(newCoordinates));
    }
  }, []);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps...</div>;

  return (
    <div className="rounded-xl overflow-hidden">
      {/* <div>Current Center Coordinates: {coordinates ? `{ lat: ${coordinates.lat}, lng: ${coordinates.lng} }` : "Loading..."}</div> */}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={localStorage.getItem("mapCenter") ? JSON.parse(localStorage.getItem("mapCenter")!) : coordinates}
        zoom={11}
        onLoad={onLoad}
        onClick={onClick} // Add onClick event handler
      >
        {forecastZoneGeometryCoordinates && forecastZoneGeometryCoordinates.length > 0 && (
          <Polygon
            paths={forecastZoneGeometryCoordinates}
            options={{
              fillColor: "lightBlue",
              fillOpacity: 0.4,
              strokeColor: "blue",
              strokeOpacity: 0.8,
              strokeWeight: 2,
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default GoogleMapComponent;
