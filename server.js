/**
 * NOTE: whats currently happening
 * 
 */







const express = require("express");
const app = express();
const datastore = require("nedb");

app.listen(5501, () => console.log("listening to port 5501"));
app.use(express.static('public'));
app.use(express.json({
    limit: '100mb',
    type: 'application/json'
}))
// var database = new datastore('database.db');
// database.loadDatabase();

var database = new datastore('database.db');
database.loadDatabase();

//sub minutes from current time
function submin(dt, minutes) {
    return new Date(dt.getTime() - minutes * 60000);
}

var i = 0;
app.use((req, res, next) => {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );

    // res.setHeader('Access-Control-Allow-Credentials', 'omit');
    // res.setHeader("Access-Control-Allow-Methods", "*");
    // res.end()

    next();

})
app.post('/api', (req, res) => {
    console.log("received request");
    i++;
    var data = req.body;
    // const timestamp = Date.now();
    // data.timestamp = timestamp;

    // databaseArr.push("Requests: " + i + " , data: " + req.body.fname + ", " + req.body.lname);

    // database.insert(data);
    console.log("req.body: ");
    console.log(req.body);
    // if (req.body.fname || req.body.lname) {
    //     console.log("First name: " + req.body.fname);
    //     console.log("Last name: " + req.body.lname);
    // }
    // console.table(database)

    res.json({
        status: 'success',
        // timestamp: timestamp,
        firstname: req.body.fname,
        lastname: req.body.lname,
        data: req.body
        // database: database
    })
});