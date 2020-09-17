import React, {Component} from 'react';
import GeocoderInSearch from './GeocoderInSearch';
import Geocoder from 'react-mapbox-gl-geocoder';
import ReactMapGL, { GeolocateControl } from 'react-map-gl';
 
const mapAccess = {
    mapboxApiAccessToken: "pk.eyJ1IjoibWFwYm94c2giLCJhIjoiY2tlbnpzbmRxM2V3NjJ6bHQ0OGN6YmVzdiJ9.NrMbCzbdfJNuVJauavvztA"
}
 
const mapStyle = {
    width: '100%',
    height:'40vh'
}

const queryParams = {
  country: 'sv'
}

class MapWithGeocoder extends Component {
  state = {
    viewport: {
      latitude: 59.337169,
      longitude: 18.059387,
      zoom: 12
    }
  }

  onSelected = (viewport, item) => {
      this.setState({viewport});
      console.log('Selected: ', item)
  }

  render() {
      const {viewport} = this.state
  
      return (
        <>
        <Geocoder
                   {...mapAccess} onSelected={this.onSelected} {...mapStyle} viewport={viewport} hideOnSelect={true}
                   queryParams={queryParams}
               />   
        <ReactMapGL  {...mapAccess} {...this.state.viewport} 
          {...mapStyle}
          onViewportChange={viewport => this.setState({viewport})}>
          <GeolocateControl
            positionOptions={{enableHighAccuracy: true}}
            trackUserLocation={true}
          />
        </ReactMapGL>
        </>
      )
      // return (
      //     <div>
      //         <Geocoder
      //             {...mapAccess} onSelected={this.onSelected} viewport={viewport} hideOnSelect={true}
      //             queryParams={queryParams}
      //         />

      //         <ReactMapGL
      //             {...mapAccess} {...viewport}
      //             width="100vw"
      //             height="100vh"
      //             onViewportChange={viewport => this.setState({viewport})}>
      //             <GeolocateControl
      //               positionOptions={{enableHighAccuracy: true}}
      //               trackUserLocation={true}
      //         />
      //     </div>
      //)
  }
}

export default MapWithGeocoder;
