import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { PlottyGeotiffLayer } from './GeotiffLayer'

export default class map extends Component{
    constructor(props){
        super(props)

        this.state={
          // tiffImage:'/../data/wind_direction.tif'
          tiffImage:"https://stuartmatthews.github.io/leaflet-geotiff/tif/wind_direction.tif"

        }

        this.layerRef = React.createRef();
        this.options = {
          band: 0,
          displayMin: 0,
          displayMax: 1000,
          colorScale: "rainbow",
          clampLow: false,
          clampHigh: false
        }
    }

  render() {
    const position = [-25.688978, 136.055747]
    
    return (
        <>
            
        <Map center={position} zoom={7}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <PlottyGeotiffLayer 
              layerRef = { this.layerRef } 
              url = { this.state.tiffImage} 
              options = { this.options }/>

            <Marker position={position}>
            <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
            </Marker>
        </Map>
      </>
    )
  }
}