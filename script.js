
/*
    First form on submit:
    1. validate form. 
    2. gather data into object.
    3. close form_passenger_content_container and open form_location_content_container. 
       make passenger header smaller and location header big. 
     
*/
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
var dataObj = {
    "email": email.value,
    "passengerAmount": passengerAmount.value,
    "tripType":passengerRadioBtnValue, //no .value needed because it's from radio button
    "date": dateInput.value,
    "time": timeInput.value,
    "pickup": pickupInput.value,
    "dropoff":dropoffInput.value
}

function radioBtnValue(x){
    passengerRadioBtnValue = x;
    return x;
}

function gatherPassengerFormValues(){
    // console.log("Email: " + email.value);
    // console.log("Passengers: " + passengerAmount.value);
    // console.log("Trip type: " + passengerRadioBtnValue);
    // console.log("date: " + dateInput.value);
    // console.log("time: " + timeInput.value);
    // console.log("pickup: " + pickupInput.value);
    // console.log("dropoff: " + dropoffInput.value);


    dataArr = [email.value, passengerAmount.value, passengerRadioBtnValue];
    console.log("");

    for(var value in dataArr){
        console.log(dataArr[value]);
    }
}
function gatherLocationFormValues() {
    dataArr.push(dateInput.value,timeInput.value,pickupInput.value,dropoffInput.value);
     for(var value in dataArr){
        console.log("Array value: " + dataArr[value]);
     }
//     for (var property in dataObj) {
//         console.log(`${property}: ${dataObj[property]}`);
// }
    // console.log(dataObj['email']);
    for (var property in dataObj) {
  console.log(`${property}: ${dataObj[property]}`);
}
}

//acquired all form input and placed into an array. Now, convert to object and send to server. 
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


function formSubmission() {
    console.log("Form submitted!");
}
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
    gatherLocationFormValues();
    //gather form values

    formSubmission();
    //change classes and forms. 
});
