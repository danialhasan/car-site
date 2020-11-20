//TODO
// [] server-side form validation on post request, to prevent MITM attacks. (security)
// [] server-side https certificate validation.
// [] Lock admin page with secure username and password.
// [] Implement BCRYPT
// [] Store admin username in local/browser storage.
// [] Payment Processing
/* [] Create payment algorithm that determines price based on:
        - Passenger Amount
        - Distance between pickup and dropoff
        - Vehicle type

//REVIEW
// [x] server-side header validation.
*/
//QUESTIONS
// - Where will we host the server.js? 
// - Where will we host the database.db?
// - Where will the backend admin panel login username and password files be hosted:

const express = require("express");
const app = express();
const datastore = require("nedb");
const port = 5501;
const expectedOrigin = "http://localhost:8080"; //NOTE: change to domain after site is live
app.listen(port, () => console.log(`listening to port ${port}`));
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

    res.setHeader("Access-Control-Allow-Origin", expectedOrigin);
    res.setHeader("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );

    // res.setHeader('Access-Control-Allow-Credentials', 'omit');
    // res.setHeader("Access-Control-Allow-Methods", "*");
    // res.end()

    next();

})
app.get('/allindexes', function (req, res) {
    console.log("request received")
    database.find({
        timestamp: {
            $gt: 0
        }
    }).sort({
        timestamp: -1 //return list of documents, but flipped. latest indexes first. 
    }).exec((err, docs) => {
        res.json({
            docs
        });
    })
    console.log("data sent");

})
app.get('/latestindex1min', (req, res) => {
    // var oneminagodate = submin(new Date(), 1);
    var oneminagoseconds = submin(new Date(), 1).getTime()
    //convert to milliseconds since january 1987
    database.find({
        timestamp: {
            // $gte: oneminago
            $gte: oneminagoseconds
        }
    }).sort({
        timestamp: -1
    }).exec((err, docs) => {
        res.json({
            docs: docs
        });
    })

})

app.get('/latestindex2min', (req, res) => {
    var twominagoseconds = submin(new Date(), 2).getTime()

    database.find({
        timestamp: {
            // $gte: oneminago
            $gte: twominagoseconds
        }
    }).sort({
        timestamp: -1
    }).exec((err, docs) => {
        res.json({
            docs: docs
        });
    })
})
app.get('/delete', (req, res) => {
    console.log("Wiping database...")
    database.remove({}, {
        multi: true
        // debugger;
    }, (err, numRemoved) => {
        res.json({
            message: "Database wiped."
        })
    })
})
app.post('/api', (req, res) => {
    var data, dataObjArr;
    console.log("received request");
    i++;

    // Server side form validation

    data = req.body;
    // Step 1: Check Headers
    console.log("Request Headers:");
    console.log(req.headers);
    if (req.headers.origin == expectedOrigin) {
        console.log("Received from expected origin");
    }
    // Step 2: Check Request Content Length
    if ((req.headers['content-length']) > 500) {
        console.log("request content length is too large.")
    }
    // Step 3: Check Request Body Values Array Length
    console.log(data);
    dataObjArr = Object.values(data);
    // length of this object should always be 7, because the form has 7 fields.
    if (dataObjArr.length == 7) {
        console.log(`Request body length is ${dataObjArr.length}, passes security check.`)
    }
    const timestamp = Date.now();
    data.timestamp = timestamp;

    // Request data passed all security checks, insert into database. 
    database.insert(data);
    console.log("req.body: ");
    console.log(data);
    // if (req.body.fname || req.body.lname) {
    //     console.log("First name: " + req.body.fname);
    //     console.log("Last name: " + req.body.lname);
    // }
    // console.table(database)

    res.json({
        status: 'success',
        data: data
    })
});