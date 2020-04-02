/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

let button = document.querySelector("#generate");
button.addEventListener("click", getRequest);
button.addEventListener("click", postRequest);
button.addEventListener("click", getWeatherData);

async function getRequest() {
  const response = await fetch("/test-get", {
    method: "GET",
    credentials: "same-origin",
  });
  const responseData = await response.text();
  console.log(responseData);
}

async function postRequest() {
  const response = await fetch("/test-post", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({"posting": "somedata"})
  });
  const responseData = await response.text();
  console.log(responseData);
}

async function getWeatherData() {
  const response = await fetch("http://api.openweathermap.org/data/2.5/weather?zip=70191,de&units=metric&APPID=cb23854f95face62703a8ce74dc109f1");
  const responseData = await response.json();
  console.log("Current temperature in Stuttgart is", responseData["main"]["temp"], "degrees");
}
