// components/GoogleMapComponent.tsx

import React, { useState, useRef, useCallback, useEffect} from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '50vh',
};

const stGeorgeCenter = {
  lat: 37.1,  // Latitude for St. George, Utah
  lng: -113.6, // Longitude for St. George, Utah
};

const GoogleMapComponent: React.FC = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY!,
  });

  const getInitialCenter = (): { lat: number; lng: number } | undefined=> {
    const storedCenter = localStorage.getItem("mapCenter");
    console.log(storedCenter);
    if (storedCenter) {
      try {
        console.log(JSON.parse(storedCenter))
        return JSON.parse(storedCenter);
      } catch (error) {
        console.error("Error parsing map center from local storage.", error);
      }
    }
  };


  const mapRef = useRef<google.maps.Map | null>(null);
  const [currentCenter, setCurrentCenter] = useState<{lat: number, lng: number} | undefined>(getInitialCenter());


  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const onCenterChanged = () => {
    if (mapRef.current) {
      const newCenter = mapRef.current.getCenter();
      if (newCenter) {
        setCurrentCenter({
          lat: newCenter.lat(),
          lng: newCenter.lng(),
        });
      }
    }
  };

  const handleDragEnd = () => {
    localStorage.setItem("mapCenter", JSON.stringify(currentCenter));
  }

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps...</div>;

  return (
    <div>
      <div>Current Center Coordinates: {currentCenter ? `{ lat: ${currentCenter.lat}, lng: ${currentCenter.lng} }` : 'Loading...'}</div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={stGeorgeCenter}
        zoom={11}
        onLoad={onLoad}
        onCenterChanged={onCenterChanged}
      />
    </div>
  );
};

export default GoogleMapComponent;
