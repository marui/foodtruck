var express = require("express");
var app = express();
app.listen(3000, () => {
 console.log("Server running on port 3000");
});

app.get("/areas", (req, res, next) => {
  let areaname = req.query.name;
let areas = [
  {'name':"Södermalm",'keyword':"hipster"},
  {'name':"ostermalm",'keyword':"douche bag"},
  {'name':"gamlastan",'keyword':"old town"}]

 // res.json(areas);
let results = areas.filter(area => area.name === areaname)

res.json(results);
});