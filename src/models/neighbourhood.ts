import { MultiPolygon, FeatureCollection, Feature, GeoJsonProperties, Geometry } from 'geojson';
import { FeatureNEIGH } from '../interfaces/neighbourhood';
import { LandUse, ZoneType } from './enums';

export class Neighbourhood {
  geometry: Geometry;
  area: number;
  areaName: string;
  zoneType: ZoneType;
  landUse: LandUse;
  imputedPopulation: Map<Number, Number>;
  singleFamilyDwellings: number;
  residentialDwellings: number;
  density: number;
  population: number;

  constructor(data: FeatureNEIGH) {
    this.geometry = data.geometry;
    this.area = data.properties.ZONE_LAND_AREA;
    this.areaName = data.properties.AREA_NAME;
    this.singleFamilyDwellings = data.properties.SINGLE_FAMILY_DWELLINGS;
    this.residentialDwellings = data.properties.RESIDENTIAL_DWELLINGS;
    this.density = data.properties.DENSITY;
    this.population = data.properties.POPULATION;
    if (data.properties.ZONING in ZoneType) {
      this.zoneType = ZoneType[data.properties.ZONING as keyof typeof ZoneType];
    } else {
      this.zoneType = ZoneType.OTHER;
    }
    if (data.properties.LAND_USE in LandUse) {
      this.landUse = LandUse[data.properties.LAND_USE as keyof typeof LandUse];
    } else {
      this.landUse = LandUse.OTHER;
    }
    this.imputedPopulation = new Map();
    this.imputedPopulation.set(2023, data.properties.DENSITY * data.properties.LAND_AREA);
  }
}

export class NeighbourhoodCollection {
  neighbourhoods: Neighbourhood[];
  constructor(data: FeatureNEIGH[]) {
    this.neighbourhoods = data.map((feature: FeatureNEIGH) => new Neighbourhood(feature));
  }
}
