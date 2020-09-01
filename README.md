# foodtruck
app wireframe:
https://video.com/448235674


# lang:
javascript
# framework:
front-end:react
back-end: nodejs

start new project
#install homebrew 
under the right folder
#install nodejs (version 12.18.2)
#install express

#start server : node app.js (start server host 3000)

#install postgreSQL
create database in terminal / guide:
https://courses.cs.washington.edu/courses/csep544/11au/resources/postgresql-instructions.html

terminal:Rr
createdb -U wanderlust foodtruck_database
psql -U wanderlust foodtruck_database
CREATE TABLE truck_data (truckid integer PRIMARY KEY, area text, truckname varchar(50), menu text, opentime time, closetime time, address text, foodtype text, vegan bool);

 INSERT INTO truck_data VALUES ('4','gamla stan','Burger Truck','Chicken burger 165kr, Vegan Burger 65kr' ,'10:30','13:00', 'vasagatan 55', 'burger', '1');

foodtruck_database=# SELECT * FROM truck_data;