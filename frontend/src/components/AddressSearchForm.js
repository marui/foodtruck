import React from 'react';
import { fetchTrucks } from './TruckActions';
import { connect } from "react-redux";
import  TruckCard from './TruckCard/TruckCard';
import PropTypes from 'prop-types';
import "./TruckList.css";

class AddressSearchForm extends React.Component {
    constructor(props) {
        super(props);
        var today = new Date(),
            time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        console.log("time: ", time);

        this.state = {
            address:'', 
            foodtype: '',
            showOpenNow: true, 
            isMenuShown: false,
            currentTime: time
        };
        console.log("currentTime: ", this.state.currentTime);
        this.handleChange = this.handleChange.bind(this);
        this.handleListFilter = this.handleListFilter.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOpenStatusFilter = this.handleOpenStatusFilter.bind(this);
    }

    handleChange(event) {
        this.setState({address: event.target.value});
    }

    handleListFilter(event) {
        // console.log("event.target.value/foodtype:", event.target.value);
        this.setState({foodtype: event.target.value});
        // console.log("foodtype:", this.state.foodtype);
    }

    handleOpenStatusFilter() {
        console.log("handleClick");
        this.setState((state) => ({
            showOpenNow: !state.showOpenNow,
        }));
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.dispatch(fetchTrucks(this.state.address));
    }

    render() {
        const {trucks} = this.props;
        console.log(trucks);

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label className="Formlabel">Location: </label>
                    <input type="text" className="FormInputFiled" value={this.state.address} onChange={this.handleChange} />
                    <input type="submit" className="FormSubmitButton" value="Find trucks" />

                </form>
                
                <select className="FormSelectInput" value={this.state.foodtype} onChange={this.handleListFilter}>
                    <option selected value="">Any</option>
                    <option value="chips">Chips</option>
                    <option value="falafel">Falefel</option>
                    <option value="kebab">Kebab</option>
                    <option value="burgers">burgers</option>
                </select>
                <button className="listButton" onClick={this.handleOpenStatusFilter}>
                    {this.state.showOpenNow ? 'Open now' : 'All Trucks'}
                </button> 
              
                { trucks.map((truck) => {                 
                    if ((!this.state.foodtype || truck.foodtype === this.state.foodtype) && (this.state.showOpenNow || ( truck.opentime < this.state.currentTime &&  truck.closetime > this.state.currentTime ) )){
                        var openstatus =  truck.opentime < this.state.currentTime;
                        console.log('open status',openstatus );

                        console.log('this currentime',this.state.currentTime );
                        console.log('truckopentime',truck.opentime);
                        return (
                            <div>               
                                <TruckCard key={truck.truckid}{...truck} value={this.state.isMenuShown} /> 
                            </div>
                        );  
                    } 
                  
                                             
                }
                

                )}         
            </div>
      
        );
    }
}

// const mapDispatchToProps = dispatch => ({
//     fetchTrucks,
//     dispatch
// });

AddressSearchForm.propTypes = {
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

//export default connect(mapDispatchToProps)(AddressSearchForm);
export default connect(mapStateToProps)(AddressSearchForm);
