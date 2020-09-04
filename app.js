var express = require("express");
const {Pool} = require("pg");
var MapboxClient = require("mapbox");

var app = express();
app.listen(3000, () => {
 console.log("Server running on port 3000");
});

// app.get("/areas", (req, res, next) => {
//   let areaname = req.query.name;
// let areas = [
//   {'name':"södermalm",'keyword':"hipster"},
//   {'name':"östermalm",'keyword':"douche bag"},
//   {'name':"gamlastan",'keyword':"old town"}]

//  // res.json(areas);
// let results = areas.filter(area => area.name === areaname)

// res.json(results);
// });
const pool = new Pool({
  user: "wanderlust",
  host: "localhost",
  database: "foodtruck_database",
  password: "",
  port: "5432"
});

app.get("/locations", (req, res, next) => {
   areaname = req.query.name;
  // console.log("1");

  ;(async function() {
    const client = await pool.connect()
    const query = 'SELECT * FROM truck_data WHERE area = $1'
    const value = [areaname]
    const trucklist = await client.query(query, value)
    const newtrucklist = trucklist.rows.map(truck => {
      return {"truckid":truck.truckid, 'truckname':truck.truckname };
    })
    res.json(newtrucklist)
    client.release()
  })()


});

app.get("/trucks", (req, res, next) =>{
  truckid = req.query.truckid;
  truckaddress = req.query.address;
  //console.log(truckid);
  if (truckid) {
   // console.log("0");
    ;(async function(){
      const client = await pool.connect()
      const query = 'SELECT * FROM truck_data WHERE truckid = $1'
      const value = [truckid]
      const truckinformation = await client.query(query, value)
      const newtruckinformation = truckinformation.rows.map(truck => {
        return {"truckid": truck.truckid, 'truckname': truck.truckname, "menu": truck.menu, "opentime": truck.opentime, "closetime": truck.closetime, "foodtype": truck.foodtype, "vegan": truck.vegan};
      })
    res.json(newtruckinformation)
    client.release()
    })()
  } 
  else {
  //console.log(truckaddress);
  //console.log("1");
  var mapclient = new MapboxClient('pk.eyJ1IjoibWFwYm94c2giLCJhIjoiY2tlbnpzbmRxM2V3NjJ6bHQ0OGN6YmVzdiJ9.NrMbCzbdfJNuVJauavvztA');

  mapclient.geocodeForward(truckaddress).then(function(response){
    data = response.entity;
   // console.log(data);
    var trucklocation_center = data.features[0].center;
    var area_longtitudemin = trucklocation_center[0]-0.1;
    var area_latitudemin = trucklocation_center[1]-0.1;
    var area_longtitudemax = trucklocation_center[0]+0.1;
    var area_latitudemax = trucklocation_center[1]+0.1;
  console.log("trucklocation_center=");
   console.log(trucklocation_center);
    //console.log(area_lantitudemin);

     async function trucklist(){
       const client = await pool.connect()
       const values = [area_longtitudemin, area_longtitudemax, area_latitudemin, area_latitudemax]
       const query = 'SELECT * FROM truck_data WHERE longtitude BETWEEN $1 AND $2 AND latitude BETWEEN $3 AND $4'
      // const truckinformation = await client.query(query, value_longtitudemin, value_longtitudemax, value_lantitudemin, value_lantitudemax)
       const truckinformation = await client.query(query, values)
       
       const trucklistinthearea = truckinformation.rows.map(truck => {
          return {"truckid": truck.truckid, 'truckname': truck.truckname, "menu": truck.menu, "opentime": truck.opentime, "closetime": truck.closetime, "foodtype": truck.foodtype, "vegan": truck.vegan};
         })
         res.json(trucklistinthearea)
         console.log("truckinformation")
         console.log(trucklistinthearea)
         client.release()
     };
     trucklist();

  });
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
// var longtitude = data.features[0].center[0];
// var latitude = data.features[0].center[1];
// var trucklocation_center = data.features[0].center;

// // console.log(trucklocation_center );
 
// })
// .catch(function(err){
// //handle errors

// });

