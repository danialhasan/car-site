//TODO
// [] server-side form validation on post request, to prevent MITM attacks. (security)
// [] server-side header and https certificate validation.
// [] Lock admin page with secure username and password.
// [] Store admin user and password (or just username) in local/browser storage.
//QUESTIONS
// - Where will we host the server.js? 
// - Where will we host the database.db?
// - Where will the backend admin panel login username and password files be hosted:

const express = require("express");
const app = express();
const datastore = require("nedb");
const port = 5501;
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

    res.setHeader("Access-Control-Allow-Origin", "*");
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
    console.log("received request");
    i++;
    var data = req.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;

    // databaseArr.push("Requests: " + i + " , data: " + req.body.fname + ", " + req.body.lname);

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
        // timestamp: timestamp,
        // firstname: req.body.fname,
        // lastname: req.body.lname,
        data: data
        // database: database
    })
});