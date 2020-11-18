/*jshint esversion: 6 */
var formPassengerContentContainer = document.getElementById("form_passenger_content_container_id");
var formLocationContentContainer = document.getElementById("form_location_content_container_id");
var formPassengerHeaderContainer = document.getElementById("form_passenger_header_container_id");
var formLocationHeaderContainer = document.getElementById("form_location_header_container_id");

var formSubmitBtn = document.getElementById("form_submit");
var locationFormSubmitBtn = document.getElementsByClassName("locationFormSubmit");
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
var option2 = document.getElementById("option2")

function radioBtnValue(x) {
    passengerRadioBtnValue = x;
}

function setPlaceholdersDev() {
    email.value = "test@email.com";
    passengerAmount.value = 4;
    option2.checked = true;
    formSubmitBtn.click();
    timeInput.value = "21:15";
    dateInput.value = "2020-12-25";
    pickupInput.value = "CN Tower";
    dropoffInput.value = "Pearson Airport";
    locationFormSubmitBtn[0].click();
}

function gatherPassengerFormValues() {
    dataArr = [email.value, passengerAmount.value, passengerRadioBtnValue];
}
async function postDataToServer() {
    gatherFormValues();
    const options = {
        method: 'POST',
        withCredentials: false,
        headers: {
            'content-type': 'application/json',
            'origin': 'http://localhost:8080',
        },
        body: JSON.stringify(dataObj) //stringify object containing form values.
    };
    //fetch(‘http://localhost:PORT_OF_NODE_SERVER/api', options);
    const response = await fetch('http://127.0.0.1:5501/api', options); //POST REQUEST
    console.log("fetch sent");
    const jsonData = await response.json();

    /*
     the server receives the post request and responds
     with the data that was sent, for dev purposes. 
     This is why it's called jsonData.
     */
    console.log(jsonData);
}

function gatherFormValues() {
    //set dataObj properties
    dataObj = {
        email: email.value,
        passengerAmount: passengerAmount.value,
        tripType: passengerRadioBtnValue, //no .value needed because it's from radio button
        date: dateInput.value,
        time: timeInput.value,
        pickup: pickupInput.value,
        dropoff: dropoffInput.value
    };

    /**
     * NOTE: dataObj is being put to static values for the sole purpose of making development easier.
     * When development for this feature is done, put dataObj as being equal to the commented portion above:
     * equal to form values. 
     */

    // dataObj = {
    //     email: "test@email.com",
    //     passengerAmount: 4,
    //     tripType: "triptype1", //no .value needed because it's from radio button
    //     date: "2020-11-15",
    //     time: "18:50",
    //     pickup: "pickup1",
    //     dropoff: "dropoff"
    // };
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

    // gatherFormValues();
    //gather form values

    // formSubmission();
    //change classes and forms. 
    postDataToServer();
});