import React from 'react';
import './App.css';
//import './index.css';
import Map from './components/Map';
import MapWithGeocoder from './components/MapWithGeocoder';
import TruckList from './components/TruckList';
import TruckCard from './components/TruckCard/TruckCard';
import Search from './components/Search/Search';

import { Container, Row, Col} from 'react-bootstrap';

export class App extends React.Component {
  state ={};

  render(){
    return (
      <Container>
        <h1 className="Heading"> Foodtruck Finder</h1>
        {/* Stack the columns on mobile by making one full-width and the other half-width */}
        <Row>
            <Col  xs={8} md={8}>
                    {/* <Map /> */}
                    {/* <MapWithGeocoder /> */}
                    {/* <TruckList trucks={TruckList} /> */}
                    <TruckList trucks={TruckList} />
            </Col>
            
            {/* Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop */}

            <Col xs={4} md={4}>
              <Row className="RowSearch" >
                {/* <Search trucks={TruckList} /> */}
              </Row>
            </Col>
        </Row>
      </Container>
  //   <div className="page">

  //     <div className="page-content-col-trucklist">
  //         <div className="page-content-map">
  //           <Map />
  //         </div>
  //         <div className="page-content-list">
  //           <TruckList trucks={TruckList} />
  //         </div>
  //     </div>
  //     <div className="page-content-col-search">
  //     </div>
      
  // </div>
  );
 }
}