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

const pool = new Pool({
  user: "wanderlust",
  host: "localhost",
  database: "foodtruck_database",
  password: "",
  port: "5432"
});

app.get("/areas", (req, res, next) => {
  areaname = req.query.name;
 
  async function getTruckinArea(areaname) {

    const trucklist = await pool.query('SELECT * from truck_data WHERE area= ?', areaname);
    if (!trucklist[0].length < 1){
       throw new Error('There is no truck available in this area');
    }
  return trucklist[0][0];
  
  }

});
