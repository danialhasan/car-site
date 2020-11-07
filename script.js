/*jshint esversion: 6 */
var formPassengerContentContainer = document.getElementById("form_passenger_content_container_id");
var formLocationContentContainer = document.getElementById("form_location_content_container_id");
var formPassengerHeaderContainer = document.getElementById("form_passenger_header_container_id");
var formLocationHeaderContainer = document.getElementById("form_location_header_container_id");

var formSubmitBtn = document.getElementById("form_submit");
var bookNowBtn = document.getElementsByClassName("book-now-btn");

var passengerForm = document.getElementById("passengerForm");
var locationForm = document.getElementById("locationForm");

var email = document.getElementById("emailInput");
var passengerAmount = document.getElementById("passengerInput");
// var tripType = document.getElementById("");
var dateInput = document.getElementById("dateInput");
var timeInput = document.getElementById("timeInput");
var pickupInput = document.getElementById("pickupLocationInput");
var dropoffInput = document.getElementById("dropoffLocationInput");

var passengerRadioBtnValue;
var dataArr;
var dataObj;

function radioBtnValue(x) {
    passengerRadioBtnValue = x;
    return x;
}

function gatherPassengerFormValues() {
    // console.log("Email: " + email.value);
    // console.log("Passengers: " + passengerAmount.value);
    // console.log("Trip type: " + passengerRadioBtnValue);
    // console.log("date: " + dateInput.value);
    // console.log("time: " + timeInput.value);
    // console.log("pickup: " + pickupInput.value);
    // console.log("dropoff: " + dropoffInput.value);


    dataArr = [email.value, passengerAmount.value, passengerRadioBtnValue];
    // console.log("");

    // for(var value in dataArr){
    //     console.log(dataArr[value]);
    // }
}
async function postDataToServer() {
    const data = {
        fname: "thisisthefirstname",
        lname: "thisisthelastname"
    }
    const options = {
        method: 'POST',
        withCredentials: false,
        headers: {
            'content-type': 'application/json',
            'origin': 'http://localhost:8000',
        },
        body: JSON.stringify(dataObj)
    };
    //fetch(‘http://localhost:PORT_OF_NODE_SERVER/api', options);
    const response = await fetch('http://127.0.0.1:5501/api', options);
    const jsonData = await response.json();
    /*
     the server receives the post request and responds
     with the data that was sent, for dev purposes. 
     This is why it's called jsonData.
     */
    console.log(jsonData);
    console.log("fetch sent")
}

function gatherFormValues() {
    dataArr.push(dateInput.value, timeInput.value, pickupInput.value, dropoffInput.value);
    // for (var value in dataArr) {
    //     console.log("Array value: " + dataArr[value]);
    // }
    //     for (var property in dataObj) {
    //         console.log(`${property}: ${dataObj[property]}`);
    // }
    // console.log(dataObj['email']);

    //set dataObj properties
    dataObj = {
        "email": email.value,
        "passengerAmount": passengerAmount.value,
        "tripType": passengerRadioBtnValue, //no .value needed because it's from radio button
        "date": dateInput.value,
        "time": timeInput.value,
        "pickup": pickupInput.value,
        "dropoff": dropoffInput.value
    };
    var json = JSON.stringify(dataObj);
    // acquired json, now send to server.
    console.log("gatherFormValues: " + json);
}

//acquired all form input and placed into an array and an object. Now, send to server. 
function changeForms() {
    /*
    1. Hide passenger content container
    2. Change height and fontsize of passenger header and location header
    3. Show location content container 
    */
    formPassengerHeaderContainer.classList.remove("active_header");
    formPassengerHeaderContainer.classList.add("non_active_header");
    formLocationHeaderContainer.classList.remove("non-active_header");
    formLocationHeaderContainer.classList.add("active_header");
    // header changed

    formPassengerContentContainer.classList.remove("active_content");
    formPassengerContentContainer.classList.add("non_active_content");
    formLocationContentContainer.classList.remove("non_active_content");
    formLocationContentContainer.classList.add("active_content");
    //content changed
}
/*
// async function fetchTest(link) {
//     let response = await fetch(link, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json;charset=utf-8'
//         },
//         body: JSON.stringify(dataObj)
//     });
//     let result = await response.json();

//     console.log(result.message);

}
*/
/*
function formSubmission() {
    const http = new XMLHttpRequest();
    const url = 'http://127.0.0.1:8080/';
    http.open("POST", url);
    http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
    http.send(dataObj);

    http.onreadystatechange = (e) => {
        if (this.readyState == 4 && this.status == 200) {
            console.log(http.responseText);
        } else {
            console.log("error: " + this.status)
        }
    };
    const URL = 'https://127.0.0.1/8080';
    const URL2 = 'https://127.0.0.1:5502';
    Send a GET request without any data to the server
    fetch(URL, {
            method: "GET"
        })
        // Get the JSON data from the raw response
        .then(res => res.json())
        // Print the result
        .then(console.log)


    const data = {
        "userId": 1,
        "title": "delectus aut autem",
        "completed": false
    };
    Send a post request
    fetch(URL, {
        method: "POST",
        body: JSON.stringify(dataObj),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });

    fetch('/package.json')
        .then(response => response.json())
        .then(data => console.log(data));

    fetchTest(URL2);

    console.log("Form submitted!");
}*/

passengerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // to prevent passenger form from actually submitting
    gatherPassengerFormValues();
    //gather form values
    changeForms();
    //change classes and forms. 
});


locationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // to prevent passenger form from actually submitting
    gatherFormValues();
    //gather form values
    // formSubmission();
    //change classes and forms. 
    postDataToServer();
});