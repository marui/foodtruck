import React from "react";
import { connect } from "react-redux";
import { fetchTrucks } from "./TruckActions";

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
      <>
      <div className="listContainer">
        <h1>Find foodtrucks near by </h1>
        <div className="truckList">
          <div className="trucks">
              { trucks.map((truck) => 
              <div key={truck.truckid}> {truck.truckname}{truck.menu} </div>
              )}
          </div>
        </div>
      </div>
     </>
    );
  }
}

const mapStateToProps = state => ({
  trucks: state.trucks.items,
  loading: state.trucks.loading,
  error: state.trucks.error
});

export default connect(mapStateToProps)(TruckList);