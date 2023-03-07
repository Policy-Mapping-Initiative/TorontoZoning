const fs = require('fs');

let ROSETTA_STONE = {
    "AREA_SHORT_CODE":  "id",
    "AREA_NAME": "name",
    "POPULATION": "population",
    "LAND_AREA": "area",
    "RESIDENTIAL_DWELLINGS": "residenceCount",
    "SINGLE_FAMILY_DWELINGS": "singleFamilyCount",
    "MID_HIGH_RISE_APARTMENTS": "midHighRiseCount",
    "OTHER_ATTACHED_DWELLINGS": "otherAttachedCount",
    "SEMI_DETACHED_DWELLINGS": "semiDetachedCount",
    "ROW_HOUSES": "rowHouseCount",
    "DUPLEX_UNITS": "duplexCount",
    "LOW_RISE_APARTMENTS": "lowRiseCount",
    "DENSITY": "density"
};

function main() {
    let neighbourhoods = JSON.parse(fs.readFileSync('../geojson/140NeighbourhoodsAugmented.geojson'));
    neighbourhoods = neighbourhoods.features;

    for (const neighbourhood of neighbourhoods)  {
        let newProperties = {}
        let oldProperties = Object.assign({}, neighbourhood.properties);    // Probably unnecessary

        for (const prop in oldProperties) {
            if (!ROSETTA_STONE[prop]) {
                continue;   // We don't care about all properties
            }
            else if (prop === "AREA_NAME") {
                newProperties[ROSETTA_STONE[prop]] = oldProperties[prop].split('(')[0].trim();
            }
            else {
                newProperties[ROSETTA_STONE[prop]] = oldProperties[prop]
            }
        }

        neighbourhood.properties = newProperties
    }

    fs.writeFileSync('../geojson/neighbourhoodsSimple.geojson', JSON.stringify(neighbourhoods));
}

main();