import React, { useState } from 'react'
import { 
  useMapEvents,
  TileLayer,
  LayersControl,
  LayerGroup,
  GeoJSON,
} from 'react-leaflet'
import L from 'leaflet'
import TO from '../data/ZoningArea.json'
import { ZoneData } from '../models/zone'

const Layers = () => {
  // only load 50 zones to ease testing
  const data = new ZoneData(TO, 50);
  const [borderData, setBorderData] = useState([data])

  const map = useMapEvents({
    zoomend: () => {
      console.log(map.getZoom())
    },
    moveend: () => {
      console.log(map.getBounds())
    }
  })

  const onMouseEvent = (event: L.LeafletMouseEvent, type: string) => {
    switch (type) {
      case 'over':
        event.target.setStyle({ fillOpacity: 0.5 })
        break
      case 'out':
        event.target.setStyle({ fillOpacity: 0.0 })
        break
      default:
        break
    }
  }

  return (
    <>
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="Basic Map">
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Topo Map">
          <TileLayer
            attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        {borderData.map((data) => {
          const output = []
          for (const elem of data.features){
            const geojson = elem.geometry
            const name = "test";
            output.push((
              <>
                <LayersControl.Overlay checked name={name}>
                  <LayerGroup>
                  <GeoJSON 
                    key={name} 
                    data={geojson} 
                    pathOptions={{ color: 'blue' }}
                    eventHandlers={{
                      mouseover: (event: L.LeafletMouseEvent) => onMouseEvent(event, 'over'),
                      mouseout: (event: L.LeafletMouseEvent) => onMouseEvent(event, 'out'),
                    }}
                  >
                  </GeoJSON>
                  </LayerGroup>
                </LayersControl.Overlay>
              </>
            ))
          }
          return output;
        })}
      </LayersControl>
    </>
  )
}

export default Layers