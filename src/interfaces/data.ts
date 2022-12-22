import type { GeoJsonObject } from 'geojson';

interface Props {
    _id: number,
    GEN_ZONE: string,
    ZN_ZONE: string,
    ZN_HOLDING: string,
    HOLDING_ID: string,
    FRONTAGE: number,
    ZN_AREA: number,
    UNITS: string,
    DENSITY: string,
    COVERAGE: string,
    FSI_TOTAL: number,
    PRCNT_COMM: number,
    PRCNT_RES: number,
    PRCNT_EMMP: number,
    PRCNT_OFFC: number,
    ZN_EXCPTN: string,
    EXCPTN_NO: number,
    STAND_SET: number,
    ZN_STATUS: number,
    ZN_STRING: string,
    AREA_UNITS: string,
    ZBL_CHAPT: number,
    ZBL_SECTN: number,
    ZBL_EXCPTN: string,
}

interface feature {
    type: string,
    properties: Props
    geometry: GeoJsonObject
}

interface CRS {
    type: string,
    properties: { name: string }
}

export interface zoneData {
    type: string,
    crs: CRS,
    features : feature[]
}
