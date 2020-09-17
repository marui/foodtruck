import React, {Component} from 'react';
import Geocoder from 'react-mapbox-gl-geocoder';
import ReactMapGL from 'react-map-gl';
 
const mapAccess = {
    mapboxApiAccessToken: "pk.eyJ1IjoibWFwYm94c2giLCJhIjoiY2tlbnpzbmRxM2V3NjJ6bHQ0OGN6YmVzdiJ9.NrMbCzbdfJNuVJauavvztA"
}
 
const mapStyle = {
    width: '100%',
    height: 600
}
 
const queryParams = {
    country: 'sv'
}
 
class GeocoderInSearch extends Component {
    state = {
        viewport: {}
    }
 
    onSelected = (viewport, item) => {
        this.setState({viewport});
        console.log('Selected: ', item)
    }
 
    render() {
        const {viewport} = this.state
 
        return (
            <div>
                <Geocoder
                    {...mapAccess} onSelected={this.onSelected} viewport={viewport} hideOnSelect={true}
                    queryParams={queryParams}
                />
 
                {/* <ReactMapGL
                    {...mapAccess} {...viewport} {...mapStyle}
                    onViewportChange={(newViewport) => this.setState({viewport: newViewport})}
                /> */}
            </div>
        )
    }
}

export default GeocoderInSearch;