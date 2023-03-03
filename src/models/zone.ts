import {
    MultiPolygon,
    FeatureCollection,
    Feature,
    GeoJsonProperties,
} from 'geojson'

interface Props {
    _id: number
    GEN_ZONE: string
    ZN_ZONE: string
    ZN_HOLDING: string
    HOLDING_ID: string
    FRONTAGE: number
    ZN_AREA: number
    UNITS: string
    DENSITY: string
    COVERAGE: string
    FSI_TOTAL: number
    PRCNT_COMM: number
    PRCNT_RES: number
    PRCNT_EMMP: number
    PRCNT_OFFC: number
    ZN_EXCPTN: string
    EXCPTN_NO: number
    STAND_SET: number
    ZN_STATUS: number
    ZN_STRING: string
    AREA_UNITS: string
    ZBL_CHAPT: number
    ZBL_SECTN: number
    ZBL_EXCPTN: string
}

export interface FeatureTO extends Feature {
    type: 'Feature'
    properties: Props
    geometry: MultiPolygon
}

interface CRS {
    type: string
    properties: GeoJsonProperties
}

export interface ZoneDataState {
    type: 'FeatureCollection'
    crs: CRS
    features: FeatureTO[]
}

export class ZoneData implements FeatureCollection {
    type: 'FeatureCollection'
    crs: CRS
    features: FeatureTO[]

    constructor(input: any, n: number = -1) {
        this.type = 'FeatureCollection'
        this.crs = input.crs
        const temp = []
        let i = 0
        for (const elem of input.features) {
            temp.push(elem)
            i = i + 1
            if (i == n) {
                break
            }
        }
        this.features = temp
    }
}
