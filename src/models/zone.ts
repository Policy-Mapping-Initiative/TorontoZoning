import type { GeoJsonObject } from 'geojson';

interface Props {
    _id: number;
    GEN_ZONE: string;
    ZN_ZONE: string;
    ZN_HOLDING: string;
    HOLDING_ID: string;
    FRONTAGE: number;
    ZN_AREA: number;
    UNITS: string;
    DENSITY: string;
    COVERAGE: string;
    FSI_TOTAL: number;
    PRCNT_COMM: number;
    PRCNT_RES: number;
    PRCNT_EMMP: number;
    PRCNT_OFFC: number;
    ZN_EXCPTN: string;
    EXCPTN_NO: number;
    STAND_SET: number;
    ZN_STATUS: number;
    ZN_STRING: string;
    AREA_UNITS: string;
    ZBL_CHAPT: number;
    ZBL_SECTN: number;
    ZBL_EXCPTN: string;
}

class Feature {
    type: string;
    properties: Props;
    geometry: GeoJsonObject;

    constructor(input: any) {
        this.type = input.type;
        this.properties = input.properties;
        this.geometry = input.geometry
    }
}

interface CRS {
    type: string;
    properties: { name: string };
}

export class ZoneData {
    type: string;
    crs: CRS;
    features : Feature[];

    constructor(input: any, n: number = -1) {
        this.type = input.type;
        this.crs = input.crs;
        const temp = [];
        let i = 0;
        for (const elem of input.features){
            temp.push(new Feature(elem));
            i = i + 1;
            if (i == n) {
                break;
            }
        }
        this.features = temp;
    }
}