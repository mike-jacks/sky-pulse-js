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
  const [forecastUrl, setForecastUrl] = useState<string>("");
  const [forecastHourlyUrl, setForecastHourlyUrl] = useState<string>("");
  const [weatherDataForForecast, setWeatherDataForForecast] = useState<any>(null);
  const [weatherDataForForecastHourly, setWeatherDataForForecastHourly] = useState<any>(null);

  const [relativeLocation, setRelativeLocation] = useState<any>(null);
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [timeZone, setTimeZone] = useState<string>("");

  const [forecastData, setForecastData] = useState<any[]>([]);
  const [forecastHourlyData, setForecastHourlyData] = useState<any[]>([]);

  const fetchLocationData = useCallback(async (coords: { lat: number; lng: number }) => {
    try {
      const response = await fetch(`https://api.weather.gov/points/${coords.lat},${coords.lng}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }, []);

  const storeLocationData = useCallback(
    async (coords: { lat: number; lng: number }) => {
      const data = await fetchLocationData(coords);
      setLocationData(data);
    },
    [fetchLocationData]
  );

  const fetchWeatherData = useCallback(async (url: string) => {
    if (!url) return;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("This error is happening");
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (locationData && locationData.properties) {
      storeForecastUrls();
    }
  }, [locationData]);

  const storeForecastUrls = useCallback(async () => {
    if (locationData && locationData.properties) {
      setForecastUrl(locationData.properties.forecast);
      setForecastHourlyUrl(locationData.properties.forecastHourly);
    }
  }, [locationData]);

  const storeForecastData = useCallback(async () => {
    const forecastData = await fetchWeatherData(forecastUrl);
    const forecastHourlyData = await fetchWeatherData(forecastHourlyUrl);
    setWeatherDataForForecast(forecastData);
    setWeatherDataForForecastHourly(forecastHourlyData);
    if (forecastData && forecastData.properties) {
      setForecastData(forecastData.properties.periods);
    }
    if (forecastHourlyData && forecastHourlyData.properties) {
      setForecastHourlyData(forecastHourlyData.properties.periods);
    }
  }, [forecastUrl]);

  useEffect(() => {
    if (locationData && locationData.status === 404) {
      setCity("");
      setState("");
      setWeatherDataForForecast(null);
    }
  }, [locationData]);

  useEffect(() => {
    if (locationData && locationData.properties) {
      const { relativeLocation, timeZone } = locationData.properties;
      if (relativeLocation && relativeLocation.properties) {
        setRelativeLocation(relativeLocation);
        setCity(relativeLocation.properties.city);
        setState(relativeLocation.properties.state);
      }
      setTimeZone(timeZone);
    }
  }, [locationData]);

  useEffect(() => {
    if (forecastUrl) {
      storeForecastData();
    }
  }, [forecastUrl]);

  useEffect(() => {
    console.log(forecastData);
  }, [forecastData]);

  const [isDay, setIsDay] = useState(true);

  useEffect(() => {
    console.log(isDay);
  }, [isDay]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row gap-10 content-start">
        <GoogleMapComponent
          coordinates={coordinates}
          setCoordinates={setCoordinates}
          storeLocationData={storeLocationData}
          storeForecastData={storeForecastData}
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
            <ForecastBarChart forecast={forecastData} isDay={isDay} />
            <ForecastTable forecast={forecastData} zeroOrOneValue={1} isDay={isDay} />

          </>
        )}
      </div>
    </div>
  );
}
