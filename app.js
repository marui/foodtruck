var express = require("express");
const {Pool} = require("pg");

var app = express();
app.listen(3000, () => {
 console.log("Server running on port 3000");
});

app.get("/areas", (req, res, next) => {
  let areaname = req.query.name;
let areas = [
  {'name':"södermalm",'keyword':"hipster"},
  {'name':"östermalm",'keyword':"douche bag"},
  {'name':"gamlastan",'keyword':"old town"}]

 // res.json(areas);
let results = areas.filter(area => area.name === areaname)

res.json(results);
});


app.get("/locations", (req, res, next) => {
   areaname = req.query.name;
  // console.log("1");
   const pool = new Pool({
    user: "wanderlust",
    host: "localhost",
    database: "foodtruck_database",
    password: "",
    port: "5432"
  });

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
const pool = new Pool({
  user: "wanderlust",
    host: "localhost",
    database: "foodtruck_database",
    password: "",
    port: "5432"

});

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

});

