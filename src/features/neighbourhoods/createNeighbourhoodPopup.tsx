import { LayersControl, LayerGroup, GeoJSON, Popup } from 'react-leaflet';
import { Typography, Divider } from '@mui/material';
import { onMouseEvent } from '../../utils';
import { getNeighbourhoods } from '../../utils/hooks';
import { useAppSelector } from '../../utils/hooks';

function perc2color(perc: number) {
	var r, g, b = 0;
	if(perc < 50) {
		g = 255;
		r = Math.round(5.1 * perc);
	}
	else {
		r = 255;
		g = Math.round(510 - 5.10 * perc);
	}
	var h = r * 0x10000 + g * 0x100 + b * 0x1;
	return '#' + ('000000' + h.toString(16)).slice(-6);
}

export const createPopup = () => {
  const collection = useAppSelector(getNeighbourhoods);
  const output = [];
  for (const elem of collection.neighbourhoods) {
    const name = elem.areaName;
    const percentSfh = Number(elem.singleFamilyDwellings / elem.residentialDwellings) * 100;
    const percentSfhStr = percentSfh.toPrecision(4);
    const color = perc2color(percentSfh);
    output.push(
      <>
        <LayersControl.Overlay checked name={name}>
          <LayerGroup>
            <GeoJSON
              key={name}
              data={elem.geometry}
              style={{ color: color }}
              eventHandlers={{
                mouseover: (event: L.LeafletMouseEvent) => onMouseEvent(event, 'over'),
                mouseout: (event: L.LeafletMouseEvent) => onMouseEvent(event, 'out'),
              }}
            >
              <Popup>
                <Typography variant="subtitle2">Neighbourhood: {name}</Typography>
                <Divider />
                <Typography variant="body2" style={{ margin: 3 }}>
                  Population: {elem.population}
                </Typography>
                <Typography variant="body2" style={{ margin: 3 }}>
                  Density: {elem.density} persons / sq.km
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
