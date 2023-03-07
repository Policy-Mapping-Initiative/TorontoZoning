const fs = require('fs');
const uuid = require('uuid')
const turf = require("@turf/turf");

const ROSETTA_STONE = {
    "AREA_SHORT_CODE": "neighbourhoodId",
    "ZONE_LAND_AREA": "area",
    "ZONING": "type",
    "LAND_USE": "landUse"
};

function main() {
    let residentialZones = JSON.parse(fs.readFileSync('../geojson/140NeighbourhoodsResidentialAreasByZone.geojson'));
    let nonResidentialZones = JSON.parse(fs.readFileSync('../geojson/140NeighbourhoodsNonResidentialAreasByZone.geojson'));
    let algorithmicZones = JSON.parse(fs.readFileSync('../geojson/AlgorithmicallyZonedAreas.geojson'));

    let allZones = [...residentialZones.features, ...nonResidentialZones.features, ...algorithmicZones.features]


    for (const zone of allZones) {
        let newProperties = {}
        let oldProperties = Object.assign({}, zone.properties);    // Probably unnecessary

        for (const prop in oldProperties) {
            if (!ROSETTA_STONE[prop]) {
                continue;   // We don't care about all properties
            }
            else {
                newProperties[ROSETTA_STONE[prop]] = oldProperties[prop]
            }

            prop.id = uuid.v4();

            zone.properties = newProperties;
        }
    }

    fs.writeFileSync('../geojson/zonesSimple.geojson', JSON.stringify(turf.featureCollection(allZones)));
}

main();