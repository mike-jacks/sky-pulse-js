export type Coordinates = {
  lat: number;
  lng: number;
};

export type GoogleMapComponentProps = {
  coordinates: Coordinates;
  setCoordinates: React.Dispatch<React.SetStateAction<Coordinates>>;
  storeLocationData: (coordinates: Coordinates) => void;
  storeForecastData: () => void;
};

export type ForecastTableProps = {
  forecast: any[];
  zeroOrOneValue: number;
  isDay: boolean;
};
