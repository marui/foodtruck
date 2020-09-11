import React from 'react';
import './index.css';
import Map from './components/Map';
import TruckList from './components/TruckList';

export class App extends React.Component {
 state ={};

  render(){
  return (
    <div className="page">
    <div className="page-content">
      <TruckList />
      <Map />
    </div>
  </div>
  );
 }
}