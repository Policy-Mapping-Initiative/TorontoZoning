import { MapContainer, ZoomControl } from 'react-leaflet';
import Layers from './layers';
import Dropdown from 'react-bootstrap/Dropdown';
import { setMapMode } from '../features/global/globalSlice';
import { useAppDispatch } from '../utils/hooks';
import DropdownButton from 'react-bootstrap/DropdownButton';

const Map = () => {
  const dispatch = useAppDispatch();
  return (
    <>
      <div id = "dropdown-daiv">
        <DropdownButton id = "dropdown-variants-primary" variant="primary" title="Select Mode" onSelect = {(eventKey) => dispatch(setMapMode(eventKey)) }>
          <Dropdown.Item href="#/action-1" eventKey = "neighbourhood">Neighbourhoods</Dropdown.Item>
          <Dropdown.Item href="#/action-2" eventKey = "zone">Zones</Dropdown.Item>
        </DropdownButton>
      </div>
      <MapContainer
        center={[43.6529, -79.3849]}
        zoom={12}
        zoomControl={false}
        style={{ height: '90vh', width: '90%' }}
      >
        <Layers />
        <ZoomControl position="topright" />
      </MapContainer>
    </>
  );
};

export default Map;
