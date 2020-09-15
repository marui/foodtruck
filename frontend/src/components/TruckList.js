import React from "react";
import { connect } from "react-redux";
import { fetchTrucks } from "./TruckActions";
import PropTypes from 'prop-types';
import { TruckCard } from './TruckCard/TruckCard';
import { DropdownButton, Dropdown } from 'react-bootstrap';

class TruckList extends React.Component {
  componentDidMount(){
    console.log("didMount");
    this.props.dispatch(fetchTrucks());
  }

  render(){
    const { error, loading, trucks} = this.props;
    console.log("render trucklist");
    console.log(trucks);
    if(error){
      return <div> Error! {error.message}</div>;
    }

    if(loading){
      return <div>Loading...</div>;
      //console.log("loading");
    }

    return (
      
      <div className="listContainer">
        <DropdownButton id="dropdown-basic-button" title="Sort by" className="Sorting">
            <Dropdown.Item href="#/action-1">Price</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Distance</Dropdown.Item>
        </DropdownButton>
        <div className="truckList">
              { trucks.map((truck) => 
              <TruckCard key={truck.truckid}{...truck} />
             // <div key={truck.truckid}> {truck.truckname}{truck.menu} </div>
              )}
        </div>
      </div>
     
    );
  }
}

TruckList.propTypes = {
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
  trucks: state.trucks.items,
  loading: state.trucks.loading,
  error: state.trucks.error
});

export default connect(mapStateToProps)(TruckList);