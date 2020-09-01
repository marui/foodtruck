const { Pool, Client } = require("pg");

const pool = new Pool({
  user: "wanderlust",
  host: "localhost",
  database: "foodtruck_database",
  password: "",
  port: "5432"
});

pool.query("SELECT * from truck_data WHERE area='vasastan' ", (err, res) => {
  console.log(err, res);
  pool.end();
});