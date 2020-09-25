import React from "react";
import { connect } from "react-redux";
import { fetchTrucks } from "./TruckActions";
import PropTypes from 'prop-types';
import  TruckCard from './TruckCard/TruckCard';
import { Button, DropdownButton, Dropdown } from 'react-bootstrap';
import AddressSearchForm from './AddressSearchForm';

class TruckList extends React.Component {
    constructor(props) {
        super(props);
        //this.state = {isToggleOn: true, isMenuShown: false};
        this.state = {isToggleOn: true, isMenuShown: false};
        console.log("constructor");
        this.handleClick = this.handleClick.bind(this);

    }

    handleClick() {
        console.log("handleClick");
        this.setState(state => ({
            isToggleOn: !state.isToggleOn
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

        return (
      
            <div className="listContainer">
                {/* <DropdownButton id="dropdown-basic-button" title="Sort by" className="Sorting">
            <Dropdown.Item>Name</Dropdown.Item>
        </DropdownButton>  */}
                <AddressSearchForm />
          
          
                <button className="listButton" onClick={this.handleClick}>
                    {this.state.isToggleOn ? 'Falafel Trucks only' : 'All Trucks'}
                </button>
                <div className="truckList">
            
                    { trucks.map((truck) => {
                    //console.log(this.state.isToggleOn);
                        if(this.state.isToggleOn === true || truck.foodtype === 'falafel'){
                            return (
                                <div>               
                                    <TruckCard key={truck.truckid}{...truck} value={this.state.isMenuShown} /> 
                                </div>
                            );
                        
                        } 
                    }        
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