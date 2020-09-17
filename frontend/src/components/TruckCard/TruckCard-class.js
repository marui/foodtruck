import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import './TruckCard.css';
import { fetchTrucks } from "../TruckActions";
//import { Card } from 'react-bootstrap';

class TruckCard extends React.Component {
  constructor(props) {
    super(props);    
    this.state = {isMenuShown: false};
    console.log(this.state.isMenuShown);
    // This binding is necessary to make `this` work in the callback
    this.handleShowMenuClick = this.handleShowMenuClick.bind(this);
  };

  handleShowMenuClick() { 
   console.log("handleShowMenuClick happens");
    this.setState(state => ({
      isMenuShown: !state.isMenuShown
    }));
  }

  componentDidMount(){
    console.log("TruckCard didMount");
    this.props.dispatch(fetchTrucks());
  }

  render() {
    const { trucks } = this.props;
    console.log("trucks: ", trucks);
    return(
    
      <div className="text-center">
        {/* <button onClick={this.handleShowMenuClick}>
        {this.state.isMenuShown ? 'ON' : 'OFF'}</button> */}
        <div className="text-center" style={{ width: '100%' }}>
              <label>{trucks.truckname}</label>
              <label id="foodtype">{trucks.foodtype}</label>
                    <br /><br />
                    <label>Opening hours: </label>
                    <br />
                    {trucks.opentime}-{trucks.closetime}
                    <br /><br />
                    <label>Location Coordinates: </label>
                    <br />
                    {trucks.latitude},{trucks.longitude}
                    <br />
                    <br />
                    {this.isMenuShown ? <div id="truckmenu">Menu: {trucks.menu} </div> : null}
                    {/* <div id="truckmenu">Menu: {trucks.menu} </div> */}
                    <br />
                               
          </div>

      </div>
    );
    
    }
}


TruckCard.propTypes = {
  trucks: PropTypes.arrayOf(
    PropTypes.shape({
      truckname: PropTypes.string.isRequired,
      menu: PropTypes.string.isRequired,
      foodtype:PropTypes.string.isRequired,
      opentime: PropTypes.number.isRequired,
      closetime:PropTypes.number.isRequired,
      latitude: PropTypes.string.isRequired,
      longitude: PropTypes.string.isRequired
    }),
  ),
};


const mapStateToProps = state => ({
  trucks: state.trucks.items
});


// componentWillUnmount(){
//   console.log("TruckCard unMount");
//   this.props.dispatch(fetchTrucks());
// }
//export default connect(mapStateToProps)(TruckCard);
export default TruckCard;