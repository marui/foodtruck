import React from 'react';
//import PropTypes from 'prop-types';
import './TruckCard.css';

class TruckCard extends React.Component {
    constructor(props) {
        super(props);    
        //this.state = {isMenuShown: false};
        console.log(this.state.isMenuShown);
        // This binding is necessary to make `this` work in the callback
        this.handleShowMenuClick = this.handleShowMenuClick.bind(this);
    }

    handleShowMenuClick() { 
        console.log("handleShowMenuClick happens");
        this.setState(state => ({
            isMenuShown: !state.isMenuShown
        }));
    }

    render() {

        return(
    
            <div className="text-center">      
                <div className="Truckcard" style={{ width: '100%' }}>
                    <label>{this.props.truckname}</label>
                    <br />
                    <label id="foodtype">{this.props.foodtype}</label>
                    <br /><br />
                    <label>Opening hours: </label>
                    <br />
                    {this.props.opentime}-{this.props.closetime}
                    <br /><br />
                    <label>Location Coordinates: </label>
                    <br />
                    {this.props.latitude},{this.props.longitude}
                    <br />
                    <br />
                    {this.state.isMenuShown ? <div id="truckmenu">Menu: {this.props.menu} </div> : null}
                    {/* <div id="truckmenu">Menu: {trucks.menu} </div> */}
                    <br />
                    <button className="cardButton" onClick={this.handleShowMenuClick}>
                        {this.state.isMenuShown ? 'Hide menu' : 'Show menu'}</button>                
                </div>
            </div>
        );
    
    }
}


export default TruckCard;