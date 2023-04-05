/**
 * It perhaps is not good practise to do multiple things with a single script in the 
 * fashion that I am doing it but... Why not. This whole bloody set of scripts is a mess.
 * This will take a set of zones and neighbourhoods as input. Assign to each neighbourhood a 
 * set of zones that it contains as well as calculate the residential land area, non residential land area
 * and open space land area for a neighbourhood. As a bonus it will also calculate the land area of just 
 * low density residential housing and write it to the neighbourhood metadata
 */


 const fs = require('fs');
 const turf = require("@turf/turf");
 const yargs = require(`yargs`)
     .usage(`Usage $0 --zones=[file] --neighbourhoods=[file] --out=[file]`)
     .alias('z', "zones")
     .alias('n', "neighbourhoods")
     .alias('o', 'out')
     .demandOption(['z', 'n', 'o'])
     .argv
 

function main() {
    const zoneFile = yargs.z;
    const neighbourhoodFile = yargs.n;
    const outFile = yargs.o;

    const zoneData = JSON.parse(fs.readFileSync(zoneFile));
    const neighbourhoodData = JSON.parse(fs.readFileSync(neighbourhoodFile));

    // We're going to be tallying a couple of things based on each 
    // individual neighbourhood... So lets do them all
    let runningNeighbourhoodTallies = {}

    neighbourhoodData.features.forEach(neighbourhood => {
        runningNeighbourhoodTallies[neighbourhood.properties.id] = {
            zones: [],
            residentialArea: 0,
            nonResidentialArea: 0,
            mixedUseArea: 0,
            openSpaceArea: 0,
            singleFamilyArea: 0
        };
    });

    // Loop through the zones and update our running tallies
    for (const zone of zoneData.features) {

        const neighbourhoodId = zone.properties.neighbourhoodId;

        const isCorrectMatch = checkCorrectMatch(zone, neighbourhoodData.features[neighbourhoodId - 1]);


        runningNeighbourhoodTallies[neighbourhoodId].zones.push(zone.properties.id);

        switch(zone.properties.landUse) {
            case "RESIDENTIAL":
                runningNeighbourhoodTallies[neighbourhoodId].residentialArea += zone.properties.area

                // If it's low density add it!
                if (zone.properties.type === "RESIDENTIAL_LOW_DENSITY") { 
                    runningNeighbourhoodTallies[neighbourhoodId].singleFamilyArea += zone.properties.area;
                }
            break;
            case "MIXED_USE":
                runningNeighbourhoodTallies[neighbourhoodId].mixedUseArea += zone.properties.area
            break;
            case "NON_RESIDENTIAL":
                if (zone.properties.type === "OPEN_SPACE") {
                    runningNeighbourhoodTallies[neighbourhoodId].openSpaceArea += zone.properties.area
                }
                else {
                    runningNeighbourhoodTallies[neighbourhoodId].nonResidentialArea += zone.properties.area
                }
        }
    }

    // Augment our features
    for (const neighbourhood of neighbourhoodData.features) {
        Object.assign(neighbourhood.properties, runningNeighbourhoodTallies[neighbourhood.properties.id]);
    }

    neighbourhoodData.features.sort((a, b) => a.properties.id - b.properties.id);

    fs.writeFileSync(outFile, JSON.stringify(neighbourhoodData));
}

/**
 * Checks the correctness of our earlier matching between zone and neighbourhood
 * @param {*} zone 
 * @param {*} neighbourhood 
 */
function checkCorrectMatch(zone, neighbourhood) {
    const isCorrectMatch = turf.booleanContains(neighbourhood, zone);
    const overlapPercentage = turf.area(turf.intersect(zone, neighbourhood)) / turf.area(zone);

    if (overlapPercentage < 1 || !isCorrectMatch) {
        console.log (`New Incongruity\n\tZone: ${zone.properties.id}\n\tNeighbourhood ${neighbourhood.properties.id}\n\tCorrect Match (per turf): ${isCorrectMatch}\n\tOverlap ${overlapPercentage * 100}%\n\n`);
    }

}

main()