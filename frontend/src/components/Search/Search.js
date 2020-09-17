import React from "react";
import './Search.css';
import { DropdownButton, Dropdown, ButtonGroup, Button, Form } from 'react-bootstrap';
import mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import GeocoderInSearch from '../GeocoderInSearch';



class Search extends React.Component {




  render(){
      
    // mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94c2giLCJhIjoiY2tlbnpzbmRxM2V3NjJ6bHQ0OGN6YmVzdiJ9.NrMbCzbdfJNuVJauavvztA';

    // const newLocal = 'Search';
    // var geocoder = new MapboxGeocoder({
    //     accessToken: mapboxgl.accessToken,
    //     zoom: 12,
    //     placeholder: newLocal,
    //     mapboxgl: mapboxgl
    //      });
         
    // geocoder.addTo('#geocoder');


    const { error, loading, trucks} = this.props;
    console.log("render Search");
    console.log(trucks);
    if(error){
      return <div> Error! {error.message}</div>;
    }

    if(loading){
      return <div>Loading...</div>;
      //console.log("loading");
    }


    return (     
      <div className="Search">
        <Form>
          <Form.Row>
            <Form.Label>Location:</Form.Label>
            <br />
            <Form.Control as="input" type="text" placeholder="Search" />
          </Form.Row>
          <Form.Row>
            <Form.Group id="formFoodtype">
            <br />
            <Form.Label>Food Types:</Form.Label>
              <Form.Check type="checkbox" label="Burger" />
              <Form.Check type="checkbox" label="Kebaba" />
              <Form.Check type="checkbox" label="Chips" />
              <Form.Check type="checkbox" label="Vegan"  />
              <Form.Check type="checkbox" label="Falafel" />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group id="formDistance">
            <Form.Label>Distance:</Form.Label>
              <DropdownButton id="dropdown-basic-button" title="+0 km">
                <Dropdown.Item href="#/action-1">-2 km</Dropdown.Item>
                <Dropdown.Item href="#/action-2">-1 km</Dropdown.Item>
                <Dropdown.Item href="#/action-3">+0 km</Dropdown.Item>
                <Dropdown.Item href="#/action-4">+1 km</Dropdown.Item>
                <Dropdown.Item href="#/action-4">+2 km</Dropdown.Item>
              </DropdownButton>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group id="formOpeningStatus">
            <Form.Label>Status: </Form.Label><br />
              <ButtonGroup aria-label="Opening now">
                    <Button variant="secondary" onClick="">Opeinging Only</Button>
              </ButtonGroup>
            </Form.Group>
          </Form.Row>

          <Button variant="primary" value="" type="submit">
            Search
          </Button>
        </Form>
     </div>
    );
  }
}


export default Search;