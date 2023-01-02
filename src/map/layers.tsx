import React, { useState } from 'react'
import { 
  useMapEvents,
  TileLayer,
  LayersControl,
  LayerGroup,
  GeoJSON,
  Popup
} from 'react-leaflet'
import { Typography, Divider } from "@mui/material";
import L from 'leaflet'
import Neighbourhoods from '../data/140NeighbourhoodsAugmented.json'
import { NeighbourhoodData } from '../models/neighbourhoods'

const Layers = () => {
  const data = new NeighbourhoodData(Neighbourhoods);
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
            const name = String(elem.properties.AREA_NAME);
            const percentSfh = Number(elem.properties.SINGLE_FAMILY_DWELLINGS / elem.properties.RESIDENTIAL_DWELLINGS)
            const percentSfhStr = percentSfh.toPrecision(2)
            output.push((
              <>
                <LayersControl.Overlay checked name={name}>
                  <LayerGroup>
                    <GeoJSON key={name} data={geojson} pathOptions={{ color: 'blue' }}
                      eventHandlers={{
                        mouseover: (event: L.LeafletMouseEvent) => onMouseEvent(event, 'over'),
                        mouseout: (event: L.LeafletMouseEvent) => onMouseEvent(event, 'out'),
                      }}
                    >
                      <Popup>
                        <Typography variant='subtitle2'>
                          Neighbourhood: {name}
                        </Typography>
                        <Divider />
                        <Typography variant='body2' style={{ margin: 3 }}>
                          Population: {elem.properties.POPULATION}
                        </Typography>
                        <Typography variant='body2' style={{ margin: 3 }}>
                          Density: {elem.properties.DENSITY} persons / sq.km
                        </Typography>
                        <Typography variant='body2' style={{ margin: 3 }}>
                          Single Family Residential Prevalence: {percentSfhStr}%
                        </Typography>
                      </Popup>
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