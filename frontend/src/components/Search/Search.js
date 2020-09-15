import React from "react";
import './Search.css';
//import { fetchTrucks } from "../TruckActions";
import { DropdownButton, Dropdown, ButtonGroup, Button, Form } from 'react-bootstrap';

class Search extends React.Component {
  // componentDidMount(){
  //   console.log("didMount");
  //   this.props.dispatch(fetchTrucks());
  // }

  render(){
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
            <Form.Control type="text" placeholder="Search" />
          </Form.Row>

          <Form.Row>
            <Form.Group id="formFoodtype">
            <br />
            <Form.Label>Food Types:</Form.Label>
              <Form.Check type="checkbox" label="Thai" />
              <Form.Check type="checkbox" label="Hotdog" />
              <Form.Check type="checkbox" label="Sallad" />
              <Form.Check type="checkbox" label="Vegan" />
              <Form.Check type="checkbox" label="Vegentarian" />
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
                    <Button variant="secondary" href="#/?openingstatus=yes">Opeinging Only</Button>
              </ButtonGroup>
            </Form.Group>
          </Form.Row>

          <Button variant="primary" href="#/action-1" type="submit">
              Search
          </Button>
        </Form>
     </div>
    );
  }
}

export default Search;