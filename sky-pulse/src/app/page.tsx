"use client";
import { BarChart } from "@mui/x-charts";
import { useCallback, useEffect, useState } from "react";
import ForecastTable from "./Components/ForecastTable";
import GoogleMapComponent from "./Components/GoogleMapComponent";
import ForecastBarChart from "./Components/ForecastBarChart";
import DayNightToggle from "./Components/DayNightToggle";

export default function Home() {
  const stGeorgeCenter = {
    lat: 37.1, // Latitude for St. George, Utah
    lng: -113.6, // Longitude for St. George, Utah
  };

  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }>(stGeorgeCenter);
  const [locationData, setLocationData] = useState<any>(null);
  const [weatherDataUrl, setWeatherDataUrl] = useState<string>("");
  const [weatherData, setWeatherData] = useState<any>(null);

  const [relativeLocation, setRelativeLocation] = useState<any>(null);
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [timeZone, setTimeZone] = useState<string>("");

  const [forecast, setForecast] = useState<any[]>([]);

  const fetchLocationData = useCallback(async (coords: { lat: number; lng: number }) => {
    try {
      const response = await fetch(`https://api.weather.gov/points/${coords.lat},${coords.lng}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchWeatherData = useCallback(async (url: string) => {
    if (!url) return;
    try {
      const response = await fetch(url);
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
      if (data && data.properties) {
        setWeatherDataUrl(data.properties.forecast);
      } else {
        setWeatherDataUrl("");
      }
    },
    [fetchLocationData]
  );

  const storeForecastData = useCallback(
    async (coords: { lat: number; lng: number }) => {
      const data = await fetchWeatherData(weatherDataUrl);
      setWeatherData(data);
      if (data && data.properties) {
        setForecast(data.properties.periods);
      }
    },
    [fetchWeatherData, weatherDataUrl]
  );

  useEffect(() => {
    if (locationData && locationData.status === 404) {
      setCity("");
      setState("");
      setWeatherData(null);
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
    if (weatherDataUrl) {
      storeForecastData(coordinates);
    }
  }, [weatherDataUrl, storeForecastData, coordinates]);

  useEffect(() => {
    console.log(forecast);
  }, [forecast]);

  const [isDay, setIsDay] = useState(true);

  useEffect(() => {
    console.log(isDay)
  }, [isDay])


  return (
    <div className="flex flex-col items-center">
      <GoogleMapComponent
        coordinates={coordinates}
        setCoordinates={setCoordinates}
        storeWeatherData={storeLocationData}
        storeForecastData={storeForecastData}
      />
      <h1 className="font-bold">
        {city ? city + ", " : "Out of United States"}
        {state ? state : ""}
      </h1>
      <div className="flex flex-col gap-10 justify-center w-full">
        <DayNightToggle isDay={isDay} setIsDay={setIsDay}/>
        
        {/* Chart */}
        <ForecastBarChart forecast={forecast} isDay={isDay}/>
        
        {/* Daily Forecast */}
        <ForecastTable forecast={forecast} zeroOrOneValue={1} />


        {/* Nightly Forecast */}
        <ForecastTable forecast={forecast} zeroOrOneValue={0} />
      </div>
    </div>
  );
}
