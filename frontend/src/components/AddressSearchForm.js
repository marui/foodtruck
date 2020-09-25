import React from 'react';
import { fetchTrucks } from './TruckActions';
import { connect } from "react-redux";
import  TruckCard from './TruckCard/TruckCard';
import PropTypes from 'prop-types';


class AddressSearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {address:''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({address: event.target.value});
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
                    <label>
            Address:
                        <input type="text" value={this.state.address} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
       
                </form>
                <div>      
                    { trucks.map((truck) => {                
                        return (
                            <div>               
                                <TruckCard key={truck.truckid}{...truck} /> 
                            </div>
                        );                   
                    }        
                    )}

                </div>
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
