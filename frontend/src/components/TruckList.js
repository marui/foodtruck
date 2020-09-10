import React from "react";
import { connect } from "react-redux";
import { fetchTrucks } from "./TruckActions";

class TruckList extends React.Component {
  componentDidMount(){
    this.props.dispatch(fetchTrucks());
  }

  render(){
    const { error, loading, trucks} = this.props;

    if(error){
      return <div> Error! {error.message}</div>;
    }

    if(loading){
      return <div>Loading...</div>;
    }

    return (
      <ul>
        { trucks.map(truck =>
        <li key={truck.id}>{truck.truckid}</li>
        )}
      </ul>
    );
  }
}

const mapStateToProps = state => ({
  trucks: state.trucks.items,
  loading: state.trucks.loading,
  error: state.trucks.error
});

export default connect(mapStateToProps)(TruckList);