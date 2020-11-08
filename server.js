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
app.get('/allindexes', function (req, res) {
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
    database.remove({}, {
        multi: true
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