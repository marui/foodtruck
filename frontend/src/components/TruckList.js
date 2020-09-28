import React from "react";
import { connect } from "react-redux";
import { fetchTrucks } from "./TruckActions";
import PropTypes from 'prop-types';
//import  TruckCard from './TruckCard/TruckCard';
import AddressSearchForm from './AddressSearchForm';
import Map from './Map';
import "./TruckList.css";


class TruckList extends React.Component {
    constructor(props) {
        super(props);
        //this.state = {isToggleOn: true, isMenuShown: false};
        this.state = {isListView: true};
        // this.state = {isToggleOn: true, isMenuShown: false};
        // console.log("constructor");
        this.handleClick = this.handleClick.bind(this);

    }

    // handleClick() {
    //     console.log("handleClick");
    //     this.setState(state => ({
    //         isToggleOn: !state.isToggleOn
    //     }));
    // }
    handleClick() {
        console.log("handleClick");
        this.setState(state => ({
            isListView: !state.isListView
        }));
    }

    componentDidMount(){
        console.log("didMount");
        this.props.dispatch(fetchTrucks());
    }

    render(){
        const { error, loading, trucks} = this.props;
        console.log("render trucklist");
        console.log(trucks);


        function truckCard(trucks){
            return(
                console.log("trucks-list:", trucks)
            );
        }

        if(error){
            return <div> Error! {error.message}</div>;
        }

        if(loading){
            return <div>Loading...</div>;
            //console.log("loading");
        }
    
        if(this.state.isListView === true){  
            return ( 
                <div className="listContainer">
                    <button className="viewButton" onClick={this.handleClick}>
                        {this.state.isListView? 'Map View' : 'List View'}
                    </button>
                    <AddressSearchForm />
                </div>
                      
            );
        }

        return(
            <div className="listContainer">              
                <button className="viewButton" onClick={this.handleClick}>
                    {this.state.isListView? 'Map View' : 'List View'}
                </button>
                <Map />
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