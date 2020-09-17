import React from 'react';
import PropTypes from 'prop-types';
import './TruckCard.css';
import { Card } from 'react-bootstrap';

export const TruckCard = ({ truckname, menu, foodtype, opentime, closetime, latitude, longitude, handleShowMenuClick }) => (
    <Card className="text-center" style={{ width: '100%' }}>
        <Card.Header>{truckname}</Card.Header>
        <Card.Body>
          <Card.Title id="foodtype">{foodtype}</Card.Title>
          <Card.Text>
              <br /><br />
              <label>Opening hours: </label>
              <br />
              {opentime}-{closetime}
              <br /><br />
              <label>Location Coordinates: </label>
              <br />
              {latitude},{longitude}
              <br />
              <br />
             
              <div id="truckmenu" className="Truckmenu">Menu: {menu} </div>
              {this.isMenuShown ? <div id="truckmenu">Menu: {menu} </div> : null}

              <br />
          </Card.Text>
          <button onClick={this.handleShowMenuClick}>{this.state.isMenuShown ? 'ON' : 'OFF'}</button>
          <br />
        </Card.Body>
        <Card.Footer className="text-muted">2 days ago</Card.Footer>
      </Card>
);

TruckCard.propTypes = {
  truckname: PropTypes.string.isRequired,
  menu: PropTypes.string,
  foodtype:PropTypes.string,
  latitude: PropTypes.string.isRequired,
  longitude: PropTypes.string.isRequired
};

TruckCard.defaultProps = {
  description: '',
};