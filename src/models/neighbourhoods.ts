import { 
    MultiPolygon,
    FeatureCollection,
    Feature,
    GeoJsonProperties 
} from 'geojson';

import {
    LandUse,
    ZoneType
} from './enums'



interface Props {
    _id: number;
    AREA_ID: number;
    AREA_ATTR_ID: number;
    PARENT_AREA_ID: null;
    AREA_SHORT_CODE: string;
    AREA_LONG_CODE: string;
    AREA_NAME: string;
    AREA_DESC: string;
    CLASSIFICATION: string;
    CLASSIFICATION_CODE: string;
    OBJECTID: string;
    POPULATION: number;
    LAND_USE: LandUse;   // Residential, Mixed Use, Non Residential ? 
    ZONING: ZoneType;       // See Simplfied Zones
    DENSITY: number;
    LAND_AREA: number;
    RESIDENTIAL_LAND_AREA: number;
    NON_RESIDENTIAL_LAND_AREA: number;
    ZONE_LAND_AREA: number; // This is the land area under the particular zone
    RESIDENTIAL_DWELLINGS: number;
    SINGLE_FAMILY_DWELLINGS: number;
    MID_HIGH_RISE_APARTMENTS: number;
    OTHER_ATTACHED_DWELLINGS: number;
    SEMI_DETACHED_DWELLINGS: number;
    ROW_HOUSES: number;
    DUPLEX_UNITS: number;
    LOW_RISE_APARTMENTS: number
    OTHER_SINGLE_ATTACHED_DWELLING: number
}

interface FeatureTO extends Feature {
    type: 'Feature';
    properties: Props;
    geometry: MultiPolygon;
}

interface CRS {
    type: string;
    properties: GeoJsonProperties;
}

export class NeighbourhoodData implements FeatureCollection {
    type: 'FeatureCollection';
    crs: CRS;
    features: FeatureTO[];

    constructor(input: any, n: number = -1) {
        this.type = 'FeatureCollection';
        this.crs = input.crs;

        const temp = [];
        let i = 0;
        for (const elem of input.features){
            temp.push(elem);
            i = i + 1;
            if (i == n) {
                break;
            }
        }
        this.features = temp;
    }
}