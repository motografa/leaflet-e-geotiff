import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
// import { PlottyGeotiffLayer } from './GeotiffLayer'
import Timeline from 'react-visjs-timeline'
// import Vis from 'vis-timeline'
import moment from 'moment'

const groupsExample = {
  groups: [],
  items: [],
  options: {
    groupOrder: 'content', // groupOrder can be a property name or a sorting function
  },
}

const now = moment()
            .minutes(0)
            .seconds(0)
            .milliseconds(0)
const groupCount = 3
const itemCount = 20

// create a data set with groups
const names = ['John', 'Alston', 'Lee', 'Grant']
for (let g = 0; g < groupCount; g++) {
  groupsExample.groups.push({ id: g, content: names[g] })
}

// create a dataset with items
for (let i = 0; i < itemCount; i++) {
  const start = now.clone().add(Math.random() * 200, 'hours')
  const group = Math.floor(Math.random() * groupCount)
  groupsExample.items.push({
    id: i,
    group: group,
    content:
      'item ' +
      i +
      ' <span style="color:#97B0F8">(' +
      names[group] +
      ')</span>',
    start: start,
    type: 'box',
  })
}
export default class map extends Component{
    constructor(props){
        super(props)

        this.timelineRef = React.createRef()
        this.state={
          tiffImage:"../TiffRepo/00S48_FT.tif",
          selectedIds: [],
        }

        this.layerRef = React.createRef();
        this.options = {
          band: 0,
          opacity: 0.7,
          displayMin: 0,
          displayMax: 100,
          colorScale: "rainbow",
          clampLow: false,
          clampHigh: false,
        }
    }

    clickHandler(props) {
      const { group } = props
      const selectedIds = groupsExample.items
        .filter(item => item.group === group)
        .map(item => item.id)
      this.setState({
        selectedIds,
      })
    }

    componentDidMount(){
      console.log('this.timelineRef')
      console.log(this.timelineRef)
    }

  render() {
    // const position = [-25.688978, 136.055747] // Australia
    const position = [-1.575302, -47.034406] // Brasil - Castanhal

  //   this.timeline.moveTo(new Date());//or
  // this.timeline.moveTo(new Date(), { animation: true });//or
  // this.timeline.moveTo(new Date(), { animation: true }, (props) => {
  //   console.log("movedTo", props);
  // });

    // const items = [
    //   { content: 'item 2', start: new Date(2019, 11, 7), end: new Date(2019, 11, 7)},
    //   { content: 'item 3', start: new Date(2019, 11, 9), end: new Date(2019, 11, 9)},
    //   { content: 'item 1', start: new Date(2019, 11, 10), end: new Date(2019, 11, 10)},
    // ]

    // const customTimes = {
    //   one: new Date(),
    //   two: new Date(2019, 11, 7),
    //   estrela: new Date(2019, 11, 8)
    // }

    // const options = {
    //   width: '100%',
    //   height: '60px',
    //   start: '2019-11-03',
    //     end: '2019-11-10',
    //   // stack: false,
    //   // showMajorLabels: true,
    //   // showCurrentTime: true,
    //   // type: "background",
    //   // format: {
    //   //   minorLabels: {
    //   //     minute: 'h:mma',
    //   //     hour: 'ha'
    //   //   }
    //   // }
    // }

    const animation ={ duration: 5000, easingFunction:'easeInQuad'}

    const basicExample = {
      options: {
        start: '2019-12-03',
        end: '2019-12-20',
      },
      items: [
        { content: 'point', start: new Date(2019, 11, 7), type: 'point'},
        { content: 'range', start: new Date(2019, 11, 9), end: new Date(2019, 11, 10), type: 'range', style:"color: red; background-color: pink;"},
        { content: 'background', start: new Date(2019, 11, 10), end: new Date(2019, 11, 11), type: 'background'},
        { content: 'box', start: new Date(2019, 11, 12), type: 'box'},
        { content: 'none', start: new Date(2019, 11, 14)},
      ],
    }

    return (
        <>
        <Map center={position} zoom={7}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
            <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
            </Marker>
        </Map>

        {/* <Timeline 
          option={options} 
          // groups={groups} 
          animation={animation}
          items={items}
          customTimes={customTimes}
          /> */}

<br/>
<br/>
<br/>
        <Timeline 
        ref={this.timelineRef}
          {...basicExample}
          />
      </>
    )
  }
}