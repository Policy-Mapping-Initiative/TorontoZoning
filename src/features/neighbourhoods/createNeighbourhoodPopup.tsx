import { LayersControl, LayerGroup, GeoJSON, Popup } from 'react-leaflet';
import { Typography, Divider } from '@mui/material';
import { onMouseEvent } from '../../utils';
import { getNeighbourhoods } from '../../utils/hooks';
import { useAppSelector } from '../../utils/hooks';

export const createPopup = () => {
  const collection = useAppSelector(getNeighbourhoods);
  const output = [];
  for (const elem of collection.neighbourhoods) {
    const name = elem.areaName;
    const percentSfh = Number(elem.singleFamilyDwellings / elem.residentialDwellings);
    const percentSfhStr = percentSfh.toPrecision(2);
    output.push(
      <>
        <LayersControl.Overlay checked name={name}>
          <LayerGroup>
            <GeoJSON
              key={name}
              data={elem.geometry}
              pathOptions={{ color: 'blue' }}
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
