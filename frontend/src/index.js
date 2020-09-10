import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Map from './components/Map';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from './components/rootReducer';
import TruckList from './components/TruckList';

const store = createStore(
rootReducer,
applyMiddleware(thunk)
);

function App(){
  return (
    <div className="App">
      <TruckList />,
      <Map />
    </div>
  );
}

ReactDOM.render(
   <Provider store={store}>
      <App />   
   </Provider>,
  document.getElementById('app')
);