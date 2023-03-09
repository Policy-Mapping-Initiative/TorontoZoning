import { LayersControl, LayerGroup, GeoJSON, Popup } from 'react-leaflet';
import { Typography, Divider } from '@mui/material';
import { onMouseEvent } from '../../utils';
import { getSelectedZones } from '../../utils/hooks';
import { useAppSelector } from '../../utils/hooks';
import { ZoneType, Colour } from '../../models/enums';
import { Zone } from '../../models/zone';


// This is just a demonstration and harmonising work of a couple things...
function getColour(zone: Zone) : string {
  switch (zone.zoneType) {
    case ZoneType.RESIDENTIAL_LOW: 
      return Colour.DARK_YELLOW;
    case ZoneType.RESIDENTIAL:
      return Colour.YELLOW
    case ZoneType.RESIDENTIAL_MID_HIGH:
      return Colour.DARK_GREEN
    case ZoneType.COMMERCIAL:
      return Colour.BLUE
    case ZoneType.MIXED_USE:
      return Colour.TEAL
    default:
      return Colour.BLACK
  }
}

export const createPopup = () => {
  const selectedZones = useAppSelector(getSelectedZones);
  const output = [];
  for (const zone of selectedZones) {
    const name = String(zone.uuid);
    output.push(
      <>
        <LayersControl.Overlay checked name={name}>
          <LayerGroup>
            <GeoJSON
              key={name}
              data={zone.geometry}
              pathOptions={{ color: getColour(zone), fillOpacity: 0.2 }}
              eventHandlers={{
                mouseover: (event: L.LeafletMouseEvent) => onMouseEvent(event, 'over'),
                mouseout: (event: L.LeafletMouseEvent) => onMouseEvent(event, 'out'),
              }}
            >
              <Popup>
                <Typography variant="subtitle2">IDX: {name}</Typography>
                <Divider />
                <Typography variant="body2" style={{ margin: 3 }}>
                  Type: {zone.type}
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
