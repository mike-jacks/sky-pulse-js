"use client";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import GoogleMapComponent from "./Components/GoogleMapComponent";

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

  const storeLocationData = useCallback(async (coords: { lat: number; lng: number }) => {
    const data = await fetchLocationData(coords);
    setLocationData(data);
    if (data && data.properties) {
      setWeatherDataUrl(data.properties.forecast);
    }
  }, [fetchLocationData]);

  const storeForecastData = useCallback(async (coords: { lat: number; lng: number }) => {
    const data = await fetchWeatherData(weatherDataUrl);
    setWeatherData(data);
    if (data && data.properties) {
      setForecast(data.properties.periods);
    }
  }, [fetchWeatherData, weatherDataUrl]);

  useEffect(() => {
    storeLocationData(coordinates);
  }, [coordinates, storeLocationData]);

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
      <div className="flex flex-row gap-5">
        <div className="rounded-lg shadow-xl border-red-400 p-5 bg-slate-800">
          <h1>Today&apos;s Forecast</h1>
          {forecast
            .filter((f) => f.number === 1)
            .map((period) => (
              <div key={period.number}>
                <table>
                  <tbody>
                    <tr>
                      <th>{period.name}</th>
                    </tr>
                    <tr>
                      <td>{period.shortForecast}</td>
                    </tr>
                    <tr>
                      <td>{period.temperature}&deg;{period.temperatureUnit}</td>
                    </tr>
                    <tr>
                      <td>{period.detailedForecast}</td>
                    </tr>
                    <tr>
                      <td>
                        <Image src={period.icon} alt={`${period.shortForecast} icon`} width="100" height="100" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
        </div>
        <div className="rounded-lg shadow-xl border-red-400 p-5 bg-slate-800">
          <h1>Daily Forecast</h1>
          {forecast
            .filter((f) => f.number % 2 === 1)
            .map((period) => (
              <div key={period.number}>
                <p>{period.name}</p>
              </div>
            ))}
        </div>
        <div className="rounded-lg shadow-xl border-red-400 p-5 bg-slate-800">
          <h1>Nightly Forecast</h1>
          {forecast
            .filter((f) => f.number % 2 === 0)
            .map((period) => (
              <div key={period.number}>
                <p>{period.name}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
