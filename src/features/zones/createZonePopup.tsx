import { LayersControl, LayerGroup, GeoJSON, Popup } from 'react-leaflet'
import { Typography, Divider } from '@mui/material'
import { onMouseEvent } from '../../utils'
import { useSelector } from 'react-redux'
import { getSelectedZones } from '../../store'

export const createPopup = () => {
    const selectedZones = useSelector(getSelectedZones)
    const output = []
    for (const elem of selectedZones) {
        const name = String(elem.properties._id)
        output.push(
            <>
                <LayersControl.Overlay checked name={name}>
                    <LayerGroup>
                        <GeoJSON
                            key={name}
                            data={elem.geometry}
                            pathOptions={{ color: 'blue' }}
                            eventHandlers={{
                                mouseover: (event: L.LeafletMouseEvent) =>
                                    onMouseEvent(event, 'over'),
                                mouseout: (event: L.LeafletMouseEvent) =>
                                    onMouseEvent(event, 'out'),
                            }}
                        >
                            <Popup>
                                <Typography variant="subtitle2">
                                    IDX: {name}
                                </Typography>
                                <Divider />
                                <Typography
                                    variant="body2"
                                    style={{ margin: 3 }}
                                >
                                    Density: {elem.properties.DENSITY}
                                </Typography>
                            </Popup>
                        </GeoJSON>
                    </LayerGroup>
                </LayersControl.Overlay>
            </>
        )
    }
    return output
}
