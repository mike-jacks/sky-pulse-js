export type Coordinates = {
  lat: number;
  lng: number;
};

export type GoogleMapComponentProps = {
  coordinates: Coordinates;
  setCoordinates: React.Dispatch<React.SetStateAction<Coordinates>>;
  forecastZoneGeometryCoordinates: Coordinates[];
};

export type ForecastTableProps = {
  forecast: any[];
  isDay: boolean;
};
