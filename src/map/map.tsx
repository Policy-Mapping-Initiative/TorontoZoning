import { MapContainer, ZoomControl } from 'react-leaflet'
import Layers from './layers'

const Map = () => {
    return (
        <>
            <MapContainer
                center={[43.6529, -79.3849]}
                zoom={12}
                zoomControl={false}
                style={{ height: '100vh', width: '100%' }}
            >
                <Layers />
                <ZoomControl position="topright" />
            </MapContainer>
        </>
    )
}

export default Map
