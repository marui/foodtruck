import React from 'react';
import mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94c2giLCJhIjoiY2tlbnpzbmRxM2V3NjJ6bHQ0OGN6YmVzdiJ9.NrMbCzbdfJNuVJauavvztA';

class Map extends React.Component {
  // Code from the next few steps will go here
    constructor(props) {
      super(props);
      this.state = {
        lng: 18.059387,
        lat: 59.337169,
        zoom: 12
      };
    }
    componentDidMount() {
      const map = new mapboxgl.Map({
        container: this.mapContainer,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [this.state.lng, this.state.lat],
        //center: [18.068924, 59.346768],
        zoom: this.state.zoom
      });

      map.addControl(
        new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true
        })
      );

      map.on('move', () => {
        this.setState({
          lng: map.getCenter().lng.toFixed(4),
          lat: map.getCenter().lat.toFixed(4),
          zoom: map.getZoom().toFixed(2)
        });
      });

        /* given a query in the form "lng, lat" or "lat, lng" returns the matching
     * geographic coordinate(s) as search results in carmen geojson format,
     * https://github.com/mapbox/carmen/blob/master/carmen-geojson.md
     */
    var coordinatesGeocoder = function(query) {
      // match anything which looks like a decimal degrees coordinate pair
      var matches = query.match(
          /^[ ]*(?:Lat: )?(-?\d+\.?\d*)[, ]+(?:Lng: )?(-?\d+\.?\d*)[ ]*$/i
      );
      if (!matches) {
          return null;
      }

      function coordinateFeature(lng, lat) {
          return {
              center: [lng, lat],
              geometry: {
                  type: 'Point',
                  coordinates: [lng, lat]
              },
              place_name: 'Lat: ' + lat + ' Lng: ' + lng,
              place_type: ['coordinate'],
              properties: {},
              type: 'Feature'
          };
      }

      var coord1 = Number(matches[1]);
      var coord2 = Number(matches[2]);
      var geocodes = [];

      if (coord1 < -90 || coord1 > 90) {
          // must be lng, lat
          geocodes.push(coordinateFeature(coord1, coord2));
      }

      if (coord2 < -90 || coord2 > 90) {
          // must be lat, lng
          geocodes.push(coordinateFeature(coord2, coord1));
      }

      if (geocodes.length === 0) {
          // else could be either lng, lat or lat, lng
          geocodes.push(coordinateFeature(coord1, coord2));
          geocodes.push(coordinateFeature(coord2, coord1));
      }

      return geocodes;
  };

      const newLocal = 'Search';
      map.addControl(
        new MapboxGeocoder({
              accessToken: mapboxgl.accessToken,
              localGeocoder: coordinatesGeocoder,
              zoom: 12,
              placeholder: newLocal,
              mapboxgl: mapboxgl
          })
      );
    }

    render() {
      return (
        <div>
          <div className='sidebarStyle'>
            <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
          </div>
          <div ref={el => this.mapContainer = el} className='mapContainer' />
        </div>
      )
    }
  }
   
export default Map;