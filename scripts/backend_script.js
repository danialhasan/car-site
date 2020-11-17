const demo = document.getElementById("demo");
var objVal;
async function deleteIndexes() {
    fetch('http://127.0.0.1:5501/delete')
        .then((res) => {
            res.json().then((json) => {
                console.log(json.message)
            })
        })
}

function helloWorld() {
    console.log("Hello World!");
}

function generateCSV() {
    // Generate CSV file from mongodb database
}
async function returnAllIndexes() {
    // debugger;
    const response = await fetch('http://localhost:5501/allindexes');
    const jsonData = await response.json().catch((err) => {
        //NOTE: just noticed the jsonData response variable is actually a constant.
        //So far, no problems. If there are problems in the future, look to this. 
        //Most likely wont be a problem as long as you don't try to change the
        //value of it later on. 
        console.log("Fetching from server didn't work: " + err)
    });
    if (jsonData.docs.length == 0) {
        console.log(
            "Warning: Cannot find any entries in database. Fetch response.docs array length == 0."
        );
        demo.textContent = 'There are no entries in the database. ';
        return;
    }
    console.log(jsonData.docs);
    console.log(jsonData.docs[jsonData.docs.length - 1].fname);
    for (let i = 0; i < jsonData.docs.length; i++) {
        console.log(i)
    }
    // console.log(jsonData._id);
    demo.textContent = 'Latest entries: ' + JSON.stringify(jsonData.docs);
    console.log(jsonData);


    objVal = Object.values(jsonData);
    /*
    objVal = array of jsonData object values. jsonData.docs is already an array, this doesn't do anything
    because its using object.values on something that isn't an object. 

    it replaces the keys, in 'key-value pairs' with array indices. 
    
    It makes more sense to use Object.values on jsonData, which is an object. THis returns an array
    of its values, which means that it returns an array consisting of arrays. The internal array 
    is at index 0 of the external array. 

    Object.values(jsonData) = [
        [
            {document1},
            {document2},
            {documentx}
        ]
    ]
    */
    console.log(objVal);
    console.log("jsonData.docs: " + jsonData.docs);
    console.log("jsonData.docs: " + JSON.stringify(jsonData.docs[0]));
    //only use JSON.stringify(jsonData.docs[0]) for displaying to console.


    createCard(objVal[0]);
    //objVal[0] is the jsonData.docs array that has the entries
}

function removeDuplicateElements() {
    const elements = document.getElementsByClassName("data_container");

    while (elements.length > 0) elements[0].remove(); //Wonderfully simple solution.
    /** HOW THIS WORKS
     * the 'elements' constant is an array of all elements with a class name of "data-container". 
     * While the array length is greater than 0 (when there are still elements on the page with
     * a class of 'data-container') remove the first index of that array.
     */
}

function createCard(x) {
    removeDuplicateElements();
    /*
    --DEBUG NOTES--
    Sometimes the error is not in the code you're currently writing,
    but instead in code that you wrote some time ago and forgot about.
    */
    //values are equal to the latest database entry

    console.log("createCard called");
    console.log(x);
    console.log("x.length: " + x.length);
    // This is because x is a json string version of the objVal array
    var temp, item, itemChild, a, i, j, k;
    var k = 0;
    temp = document.getElementsByTagName("template")[0];
    //get the div element from the template:
    item = temp.content.querySelector("div");


    for (i = 0; i < x.length; i++) {
        var templateDiv = document.importNode(item, true); //div in template, data-container
        var itemChild = templateDiv.childNodes;
        var itemChildArr = Array.from(itemChild);
        console.log("%cNEW ITERATION",
            "color:white; background-color:red; padding:10px 10px; ")
        //NOTE: FOR LOOP IS ITERATING WITH ARRAY VERSION OF ITEMCHILD
        console.log(x[i]);

        for (var j = 0; j < itemChild.length; j++) {
            switch (j) {
                case 0:
                    itemChild[j].nextSibling.childNodes[0].textContent = "Email: " + x[i].email;
                    break;
                case 2:
                    itemChild[j].nextSibling.childNodes[0].textContent = "Passenger amount: " + x[i]
                        .passengerAmount;
                    break;
                case 4:
                    itemChild[j].nextSibling.childNodes[0].textContent = "Trip Type: " + x[i].tripType;
                    break;
                case 6:
                    itemChild[j].nextSibling.childNodes[0].textContent = "Date: " + x[i].date;
                    break;
                case 8:
                    itemChild[j].nextSibling.childNodes[0].textContent = "Time: " + x[i].time;
                    break;
                case 10:
                    itemChild[j].nextSibling.childNodes[0].textContent = "Pickup: " + x[i].pickup;
                    break;

                case 12:
                    itemChild[j].nextSibling.childNodes[0].textContent = "Dropoff: " + x[i].dropoff;
                    break;

                case 14:
                    itemChild[j].nextSibling.childNodes[0].textContent = "Timestamp: " + x[i].timestamp;
                    break;

                case 16:
                    itemChild[j].nextSibling.childNodes[0].textContent = "Database ID: " + x[i]._id;
                    break;
                default:
                    break;
            }
        }

        console.log(x);
        console.log("x length: " + x.length);
        document.body.appendChild(templateDiv);
        console.log("Card Appended");
    }
    console.log("Cards created!");
}
async function returnLatestIndex1Minute() {
    const response = await fetch('http://127.0.0.1:5501/latestindex1min');
    const jsonData = await response.json().catch((err) => {
        console.log("Fetching from server didn't work: " + err)
    });
    if (jsonData.docs.length == 0) {
        console.log(
            "Warning: Cannot find any entries in database. Fetch response.docs array length == 0."
        );
        demo.textContent = 'There are no entries from 1 minute ago in the database. ';
        return;
    }
    console.log(jsonData.docs);
    demo.textContent = 'Latest entry: ' + JSON.stringify(jsonData);
    objVal = Object.values(jsonData)

    createCard(objVal[0]);

}

async function returnLatestIndex2Minute() {

    const response = await fetch('http://127.0.0.1:5501/latestindex2min');
    const jsonData = await response.json().catch((err) => {
        console.log("Fetching from server didn't work: " + err)
    });
    if (jsonData.docs.length == 0) {
        console.log(
            "Warning: Cannot find any entries from 2 minutes ago in database. Fetch response.docs array length == 0."
        );
        demo.textContent = 'There are no entries in the database from 2 minutes ago. ';
        return;
    }
    console.log(jsonData);
    demo.textContent = 'Latest entry: ' + JSON.stringify(jsonData);
    objVal = Object.values(jsonData)

    createCard(objVal[0]);
}

/* 
START OF IMPORTED CODE 
https://codepen.io/danny_pule/pen/WRgqNx
*/
// function convertToCSV(objArray) {
//     var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
//     var str = '';

//     for (var i = 0; i < array.length; i++) {
//         var line = '';
//         for (var index in array[i]) {
//             if (line != '') line += ','

//             line += array[i][index];
//         }

//         str += line + '\r\n';
//     }

//     return str;
// }

// function exportCSVFile(headers, items, fileTitle) {
//     if (headers) {
//         items.unshift(headers);
//     }

//     // Convert Object to JSON
//     var jsonObject = JSON.stringify(items);

//     var csv = this.convertToCSV(jsonObject);

//     var exportedFilenmae = fileTitle + '.csv' || 'export.csv';

//     var blob = new Blob([csv], {
//         type: 'text/csv;charset=utf-8;'
//     });
//     if (navigator.msSaveBlob) { // IE 10+
//         navigator.msSaveBlob(blob, exportedFilenmae);
//     } else {
//         var link = document.createElement("a");
//         if (link.download !== undefined) { // feature detection
//             // Browsers that support HTML5 download attribute
//             var url = URL.createObjectURL(blob);
//             link.setAttribute("href", url);
//             link.setAttribute("download", exportedFilenmae);
//             link.style.visibility = 'hidden';
//             document.body.appendChild(link);
//             link.click();
//             document.body.removeChild(link);
//         }
//     }
// }

// function download() {
//     var headers = {
//         model: 'Phone Model'.replace(/,/g, ''), // remove commas to avoid errors
//         chargers: "Chargers",
//         cases: "Cases",
//         earphones: "Earphones"
//     };

//     itemsNotFormatted = [{
//             model: 'Samsung S7',
//             chargers: '55',
//             cases: '56',
//             earphones: '57',
//             scratched: '2'
//         },
//         {
//             model: 'Pixel XL',
//             chargers: '77',
//             cases: '78',
//             earphones: '79',
//             scratched: '4'
//         },
//         {
//             model: 'iPhone 7',
//             chargers: '88',
//             cases: '89',
//             earphones: '90',
//             scratched: '6'
//         }
//     ];

//     var itemsFormatted = [];

//     // format the data
//     itemsNotFormatted.forEach((item) => {
//         itemsFormatted.push({
//             model: item.model.replace(/,/g, ''), // remove commas to avoid errors,
//             chargers: item.chargers,
//             cases: item.cases,
//             earphones: item.earphones
//         });
//     });

//     var fileTitle = 'orders'; // or 'my-unique-title'

//     exportCSVFile(headers, itemsFormatted, fileTitle);
// call the exportCSVFile() function to process the JSON and trigger the download
// }
/* END OF IMPORTED CODE */