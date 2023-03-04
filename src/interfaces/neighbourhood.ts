import { MultiPolygon, Feature } from 'geojson';

interface Props {
  _id: number;
  AREA_ID: number;
  AREA_ATTR_ID: number;
  PARENT_AREA_ID: string | null;
  AREA_SHORT_CODE: number;
  AREA_LONG_CODE: number;
  AREA_NAME: string;
  AREA_DESC: string;
  CLASSIFICATION: string;
  CLASSIFICATION_CODE: string | null;
  OBJECTID: number;
  POPULATION: number;
  LAND_AREA: number;
  RESIDENTIAL_DWELLINGS: number;
  SINGLE_FAMILY_DWELLINGS: number;
  MID_HIGH_RISE_APARTMENTS: number;
  OTHER_ATTACHED_DWELLINGS: number;
  SEMI_DETACHED_DWELLINGS: number;
  ROW_HOUSES: number;
  DUPLEX_UNITS: number;
  LOW_RISE_APARTMENTS: number;
  OTHER_SINGLE_ATTACHED_DWELLING: number;
  DENSITY: number;
  LAND_USE: string;
  ZONE_LAND_AREA: number;
  ZONING: string;
}

export interface FeatureNEIGH extends Feature {
  type: 'Feature';
  properties: Props;
  geometry: MultiPolygon;
}

export interface NeighbourhoodData {
  type: 'FeatureCollection';
  features: FeatureNEIGH[];
}
