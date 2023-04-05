import { LayersControl, LayerGroup, GeoJSON, Popup } from 'react-leaflet';
import { Typography, Divider } from '@mui/material';
import { onMouseEvent } from '../../utils';
import { getNeighbourhoods } from '../../utils/hooks';
import { useAppSelector } from '../../utils/hooks';

/**
 * Creates a colour going from red to green with higher percentages being more red
 * Percentages less than 50 map to a green, greater (or equal) than 50 maps to a red.
 * @param perc A percentage in the space of 0-100
 * @returns A hex colour code where
 */
function perc2color(perc: number) : string {
  let r,
    g,
    b = 0;
  if (perc < 50) {
    g = 255;
    r = Math.round(5.1 * perc);
  } else {
    r = 255;
    g = Math.round(510 - 5.1 * perc);
  }
  let h = r * 0x10000 + g * 0x100 + b * 0x1;
  return '#' + ('000000' + h.toString(16)).slice(-6);
}

export const createPopup = () => {
  const collection = useAppSelector(getNeighbourhoods);
  const output = [];
  for (const neighbourhood of collection.features) {
    const name = neighbourhood.name;
    console.log(neighbourhood);
    const percentSfh = (neighbourhood.singleFamilyCount / neighbourhood.residenceCount) * 100;
    const percentSfhStr = percentSfh.toPrecision(4);
    const color = perc2color(percentSfh);
    output.push(
      <>
        <LayersControl.Overlay checked name={name}>
          <LayerGroup>
            <GeoJSON
              key={name}
              data={neighbourhood.geometry}
              style={{ color: color, fillOpacity: 0.2}}
              eventHandlers={{
                mouseover: (event: L.LeafletMouseEvent) => onMouseEvent(event, 'over'),
                mouseout: (event: L.LeafletMouseEvent) => onMouseEvent(event, 'out'),
              }}
            >
              <Popup>
                <Typography variant="subtitle2">Neighbourhood: {name}</Typography>
                <Divider />
                <Typography variant="body2" style={{ margin: 3 }}>
                  Population: {neighbourhood.population}
                </Typography>
                <Typography variant="body2" style={{ margin: 3 }}>
                  Density: {neighbourhood.density} persons / sq.km
                </Typography>
                <Typography variant="body2" style={{ margin: 3 }}>
                  Single Family Residential Prevalence: {percentSfhStr}%
                </Typography>
              </Popup>
            </GeoJSON>
          </LayerGroup>
        </LayersControl.Overlay>
      </>
    );
  }
  return output;
};
