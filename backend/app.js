/* eslint-disable no-undef */
var express = require("express");
const {Pool} = require("pg");
var MapboxClient = require("mapbox");

var app = express();
app.listen(9000, () => {
 console.log("Server running on port 9000");
});

let allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "*");
  next();
}
app.use(allowCrossDomain);

const pool = new Pool({
  user: "wanderlust",
  host: "localhost",
  database: "foodtruck_database",
  password: "",
  port: "5432"
});

async function func_getDistance(lat1, long1, lat2, long2){
  const R = 6371; // km
  const dLat = (lat2-lat1) * (Math.PI/180);
  const dLon = (long2-long1) * (Math.PI/180);
  const latitude1 = lat1 * (Math.PI/180);
  const latitude2 = lat2 * (Math.PI/180);

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(latitude1) * Math.cos(latitude2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var distance = R * c;
 // console.log(distance + " km");
  return distance;
}

func_getDistance(18.05,59,18,59);

async function func_getTrucks(res){
  const client = await pool.connect()
  const query = 'SELECT * FROM truck_data'
  const trucks = await client.query(query)
  const newtrucks = trucks.rows.map(truck => {
    return {"truckid": truck.truckid, 'truckname': truck.truckname, "menu": truck.menu, "opentime": truck.opentime, "closetime": truck.closetime, "foodtype": truck.foodtype, "vegan": truck.vegan, "latitude": truck.latitude, "longitude": truck.longitude };
  })
  res.json(newtrucks)
  client.release()
}

async function func_getTruckByTruckId(truckid, res){
  const client = await pool.connect()
  const query = 'SELECT * FROM truck_data WHERE truckid = $1'
  const value = [truckid]
  const truckinformation = await client.query(query, value)
  const newtruckinformation = truckinformation.rows.map(truck => {
    return {"truckid": truck.truckid, 'truckname': truck.truckname, "menu": truck.menu, "opentime": truck.opentime, "closetime": truck.closetime, "foodtype": truck.foodtype, "vegan": truck.vegan};
  })
  res.json(newtruckinformation)
  client.release()
}

// this is endpoint to fetch the info of one truck, truck list near me
app.get("/trucks", (req, res) =>{
  const truckid = req.query.truckid;
  const truckaddress = req.query.address;

  if (truckid) {
    func_getTruckByTruckId(truckid, res);
  } else if (truckaddress){
  var mapclient = new MapboxClient('pk.eyJ1IjoibWFwYm94c2giLCJhIjoiY2tlbnpzbmRxM2V3NjJ6bHQ0OGN6YmVzdiJ9.NrMbCzbdfJNuVJauavvztA');

  mapclient.geocodeForward(truckaddress).then(function(response){
    const data = response.entity;
    const trucklocation_center = data.features[0].center;
    const area_longitudemin = trucklocation_center[0]-0.05;
    const area_latitudemin = trucklocation_center[1]-0.05;
    const area_longitudemax = trucklocation_center[0]+0.05;
    const area_latitudemax = trucklocation_center[1]+0.05;

     async function func_truckList(){
       const client = await pool.connect()
       const values = [area_longitudemin, area_longitudemax, area_latitudemin, area_latitudemax]
       const query = 'SELECT * FROM truck_data WHERE longitude BETWEEN $1 AND $2 AND latitude BETWEEN $3 AND $4'
      // const truckinformation = await client.query(query, value_longitudemin, value_longitudemax, value_lantitudemin, value_lantitudemax)
       const truckinformation = await client.query(query, values)
       var distance = distance
       // console.log(truckinformation)
       const trucklistinthearea = truckinformation.rows.map(truck => {
          return {"truckid": truck.truckid, 'truckname': truck.truckname, "menu": truck.menu, "opentime": truck.opentime, "closetime": truck.closetime, "longitude": truck.longitude, "latitude": truck.latitude, "foodtype": truck.foodtype, "vegan": truck.vegan, "distance": distance};
        })

         res.json(trucklistinthearea)
         console.log("my location:")
         console.log(trucklocation_center)
         client.release()
     }
     func_truckList();
  });
  } else {
    func_getTrucks(res);
  }

});




// app.get("/trucks", (req, res2, next) =>{
//   truckaddress = req.query.address;
//   //console.log(truckaddress);
//  // console.log("1");

//   var mapclient = new MapboxClient('pk.eyJ1IjoibWFwYm94c2giLCJhIjoiY2tlbnpzbmRxM2V3NjJ6bHQ0OGN6YmVzdiJ9.NrMbCzbdfJNuVJauavvztA');

//   mapclient.geocodeForward(truckaddress).then(function(response){
//     data = response.entity;
//    // console.log(data);
//     var trucklocation_center = data.features[0].center;
//   res2.json(trucklocation_center);
//   //console.log(truckaddress);
//   });
  
//   });






// mapclient.geocodeForward('Odengatan 65, 113 22 Stockholm, Sweden')
// .then(function(res){
//       // res is the http response, including: status, headers and entity properties
//  var data = res.entity; // data is the geocoding result as parsed JSON
// //console.log("0");
// var longitude = data.features[0].center[0];
// var latitude = data.features[0].center[1];
// var trucklocation_center = data.features[0].center;

// // console.log(trucklocation_center );
 
// })
// .catch(function(err){
// //handle errors

// });

