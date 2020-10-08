const formPassenger = document.getElementById("form_passenger_container");
var x = 0;
//toggle class 'active' on element when it is clicked
// formPassenger.addEventListener("click", toggleClass(formPassenger, "active"));

function toggleClass(element, className) {
    if (x = 0) {
        element.style.classList.add = className;
        x += 1;
    } else if (x == 1) {
        element.style.classList.subtract = className;
    }
    console.log("bruh")
}