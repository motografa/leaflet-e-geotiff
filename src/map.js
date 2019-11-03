import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { PlottyGeotiffLayer } from './GeotiffLayer'

export default class map extends Component{
    constructor(props){
        super(props)

        this.state={
            data:'../data/cite-G3802_A2_1883_S7.tif'
        }

        this.layerRef = React.createRef();
        this.options = {
          band: 0,
          colorScale: 'rainbow',
          clampLow: true,
          clampHigh: true,
          displayMin: 0,
          displayMax: 100
        }
    }

  render() {
    const position = [51.505, -0.09]
    const windSpeedOptions = {
      band: 0,
      displayMin: 0,
      displayMax: 30,
      name: "Wind speed",
      colorScale: "rainbow",
      clampLow: false,
      clampHigh: true
      //vector:true
    };


    return (
        <>
            
        <Map center={position} zoom={7}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <PlottyGeotiffLayer layerRef = { this.layerRef } url = { this.state.data } options = { windSpeedOptions }/>

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