import { 
    MultiPolygon,
    FeatureCollection,
    Feature,
    GeoJsonProperties 
} from 'geojson';

import {Zone} from './zone'

interface Props {
    name: string,
    neighbourhoodId: number,
    area: number,
    population: number,
    density: number,
    residenceCount: number,
    singleFamilyCount: number,
    midHighRiseCount: number,
    otherAttachedCount: number,
    semiDetachedCount: number,
    rowHouseCount: number,
    duplexCount: number,
    lowRiseCount: number
}

export class Neighbourhood implements Feature {

    type: 'Feature';
    properties: Props;
    geometry: MultiPolygon;
    zones: Zone[]
    residentialArea = NaN;
    mixedUseArea = NaN;
    nonResidentialArea = NaN;
    openSpaceArea = NaN;


    constructor(feature: any) {
        this.type = 'Feature'
        this.properties = feature.properties
        this.geometry = feature.geometry
        this.zones = [];
        this.residentialArea = NaN;
        this.mixedUseArea = NaN;
        this.nonResidentialArea = NaN;
        this.openSpaceArea = NaN;
    }

    get name() {
        return this.properties.name;
    }

    get neighbourhoodId() {
        return this.properties.neighbourhoodId;
    }

    get area() {
        return this.properties.area;
    }

    get population() {
        return this.properties.area;
    }

    get density() {
        return this.properties.density;
    }

    get residenceCount() {
        return this.properties.residenceCount;
    }

    get singleFamilyCount() {
        return this.properties.singleFamilyCount;
    }

    get midHighRiseCount() {
        return this.properties.midHighRiseCount;
    }

    get otherAttachedCount() {
        return this.properties.otherAttachedCount;
    }

    get semiDetachedCount() {
        return this.properties.semiDetachedCount;
    }

    get rowHouseCount() {
        return this.properties.rowHouseCount;
    }

    get duplexCount() {
        return this.properties.duplexCount;
    }

    get lowRiseCount() {
        return this.properties.lowRiseCount;
    }
}
