import React from "react";
import axios from 'axios';

class AddressField extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            address: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event){     
        this.setState({
            [event.target.name]:event.target.value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        
        // const {address} = this.state;
        // const address = mylocation;
        console.log('handleSubmit - mylocation:', this.state.address);
        //console.log('handleSubmit - address:', address);
        // axios
        //     .post('http://localhost:9000/trucks', {address})
        //     .then(() => console.log('axios post - address post', this.state.address))
        //     .catch(err => {
        //         console.error(err);
        //     }); 

    }
  
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="address">Address</label>
                <input id="address" className="form-control" name="address" type="text" placeholder="my location is ... " onChange={this.handleInputChange} />
                {/* <input id="address" className="form-control" name="" type="text" placeholder="my location is ... "  /> */}
                <button>Search</button>
            </form>
        );
    }
}

export default AddressField;


