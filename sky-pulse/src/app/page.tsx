"use client";
import { useCallback, useEffect, useState } from "react";
import DayNightToggle from "./Components/DayNightToggle";
import ForecastBarChart from "./Components/ForecastBarChart";
import ForecastTable from "./Components/ForecastTable";
import GoogleMapComponent from "./Components/GoogleMapComponent";

export default function Home() {
  const stGeorgeCenter = {
    lat: 37.1, // Latitude for St. George, Utah
    lng: -113.6, // Longitude for St. George, Utah
  };

  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }>(stGeorgeCenter);
  const [locationData, setLocationData] = useState<any>(null);
  const [forecastData, setForecastData] = useState<any>(null);
  const [forecastHourlyData, setForecastHourlyData] = useState<any>(null);
  const [forecastZoneData, setForecastZoneData] = useState<any>(null);

  const [forecastUrl, setForecastUrl] = useState<string>("");
  const [forecastHourlyUrl, setForecastHourlyUrl] = useState<string>("");
  const [forecastZoneUrl, setForecastZoneUrl] = useState<string>("");

  const [forecastZoneGeometryCoordinates, setForecastZoneGeometryCoordinates] = useState<{ lat: number; lng: number }[]>([{ lat: 0, lng: 0 }]);

  const [relativeLocation, setRelativeLocation] = useState<any>(null);
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [timeZone, setTimeZone] = useState<string>("");

  const [forecastArray, setForecastArray] = useState<any[]>([]);
  const [forecastHourlyArray, setForecastHourlyArray] = useState<any[]>([]);

  const [isDay, setIsDay] = useState(true);

  const fetchLocationData = useCallback(async (coords: { lat: number; lng: number }) => {
    try {
      const response = await fetch(`https://api.weather.gov/points/${coords.lat},${coords.lng}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchDataFromUrl = useCallback(async (url: string) => {
    if (!url) return;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return await data;
    } catch (error) {
      console.log(error);
    }
  }, []);

  const storeLocationData = async (coords: { lat: number; lng: number }) => {
    const data = await fetchLocationData(coords);
    setLocationData(data);
    return locationData;
  };

  const storeUrls = async (locData: any) => {
    if (locData && locData.properties) {
      setForecastUrl(locData.properties.forecast);
      setForecastHourlyUrl(locData.properties.forecastHourly);
      setForecastZoneUrl(locData.properties.forecastZone);
    }
  };

  const storeForecastData = async (forecastUrl: string) => {
    const rawForecastData = await fetchDataFromUrl(forecastUrl);
    setForecastData(rawForecastData);
  };

  const storeForecastHourlyData = async (forecastHourlyUrl: string) => {
    const rawForecastHourlyData = await fetchDataFromUrl(forecastHourlyUrl);
    setForecastHourlyData(rawForecastHourlyData);
  }

  const storeForecastZoneData = async (forecastZoneUrl: string) => {
    const rawForecastZoneData = await fetchDataFromUrl(forecastZoneUrl);
    setForecastZoneData(rawForecastZoneData);
  }

  const storeForecastArray = (forecastData: { properties: any }) => {
    if (forecastData && forecastData.properties) {
      setForecastArray(forecastData.properties.periods);
    }
  }

  const storeForecastHourlyArray = (forecastData: {properties: any }) => {
    if (forecastData && forecastData.properties) {
      setForecastHourlyArray(forecastData.properties.periods);
    }
  }

  const storeForecastZoneGeometryCoordinatesArray = (forecastZoneData: {geometry: any}) => {
      if (forecastZoneData && forecastZoneData.geometry) {
        const geometryCoordinatesAsArray: number[][] = forecastZoneData.geometry.coordinates[0];
        const geometryCoordinatesAsArrayObj: { lat: number; lng: number }[] = geometryCoordinatesAsArray.map((coordinate: number[]) => ({
          lat: coordinate[1],
          lng: coordinate[0],
        }));
        setForecastZoneGeometryCoordinates(geometryCoordinatesAsArrayObj);
      } else {
        console.log("weatherDataForForecast not available.");
      }
    }



  // Store Location Data
  useEffect(() => {
    if (coordinates) {
      storeLocationData(coordinates);
    }
  }, [coordinates]);

  // Store URL information
  useEffect(() => {
    if (locationData && locationData.properties) {
      storeUrls(locationData);
      const { relativeLocation, timeZone } = locationData.properties;
      if (relativeLocation && relativeLocation.properties) {
        setRelativeLocation(relativeLocation);
        setCity(relativeLocation.properties.city);
        setState(relativeLocation.properties.state);
      }
      setTimeZone(timeZone);
    } else if (locationData && locationData.status === 404) {
      setCity("");
      setState("");
      setForecastData(null);
    }
  }, [locationData]);

  // Store Forecast Data
  useEffect(() => {
    if (forecastUrl) {
      storeForecastData(forecastUrl);
    }
  }, [forecastUrl]);

  // Store Forecast Hourly Data
  useEffect(() => {
    if (forecastHourlyUrl) {
      storeForecastHourlyData(forecastHourlyUrl);
    }
  }, [forecastHourlyUrl]);

  // Store Forecast Zone Data
  useEffect(() => {
    if (forecastZoneUrl) {
      storeForecastZoneData(forecastZoneUrl);
    }
  }, [forecastZoneUrl]);



  // Store forecast Array
  useEffect(() => {
    if (forecastData) {
      storeForecastArray(forecastData);
    }
  }, [forecastData]);

  // Store forecast hourly Array
  useEffect(() => {
    if (forecastHourlyData) {
      storeForecastHourlyArray(forecastHourlyData);
    }
  }, [forecastHourlyData]);


  // Store Forecast Zone Geometry Coordinates
  useEffect(() => {
    if (forecastData) {
      storeForecastZoneGeometryCoordinatesArray(forecastData);
    }
  }, [forecastData])

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row gap-10 content-start">
        <GoogleMapComponent
          coordinates={coordinates}
          setCoordinates={setCoordinates}
          forecastZoneGeometryCoordinates={forecastZoneGeometryCoordinates}
        />
        <DayNightToggle isDay={isDay} setIsDay={setIsDay} />
      </div>
      <h1 className="font-bold">
        {city ? city + ", " : "Select a location in the USA"}
        {state ? state : ""}
      </h1>
      <div className="flex flex-col gap-10 justify-center w-full">
        {state && (
          <>
            <ForecastBarChart forecast={forecastArray} isDay={isDay} />
            <ForecastTable forecast={forecastArray} isDay={isDay} />
          </>
        )}
      </div>
    </div>
  );
}
