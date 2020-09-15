import React from 'react';
import PropTypes from 'prop-types';
import './TruckCard.css';
import { Card, Button } from 'react-bootstrap';

export const TruckCard = ({ truckname, menu, foodtype, opentime, closetime, latitude, longitude }) => (
      <Card className="text-center" style={{ width: '100%' }}>
        <Card.Header>{truckname}</Card.Header>
        <Card.Body>
          <Card.Title>{foodtype}</Card.Title>
          <Card.Text>
              <label>Menu: </label>
              <br />
              {menu}
              <br /><br />
              <label>Opening hours: </label>
              <br />
              {opentime}-{closetime}
              <br /><br />
              <label>Location Coordinates: </label>
              <br />
              {latitude},{longitude}
              <br /><br />
          </Card.Text>
          <Button variant="primary" href="" >Direct me</Button>
          <br />
          <Button variant="primary" href="" >Share</Button>
        </Card.Body>
        <Card.Footer className="text-muted">2 days ago</Card.Footer>
      </Card>

  // <div className="card">
  //   <div className="card-content">
  //       <div className="media-content">
  //         <p className="title is-8">{truckname}</p>
  //       </div>
  //     <div className="content">
  //       <label>Menu: </label>
  //       {menu}
  //       <br />
  //       <label>Food Type: </label>
  //       {foodtype}
  //       <br />
  //       <label>Opening hours: </label>
  //       {opentime}-{closetime}
  //       <br />
  //       <label>Location Coordinates: </label>
  //       {latitude},{longitude}
  //       <br />
  //     </div>
  //   </div>
  // </div>
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