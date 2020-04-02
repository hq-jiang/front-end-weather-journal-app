/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


baseUrl = "http://api.openweathermap.org/data/2.5/weather";
credentials = "APPID=cb23854f95face62703a8ce74dc109f1";

let button = document.querySelector("#generate");
// button.addEventListener("click", getRequest);
// button.addEventListener("click", postRequest);
button.addEventListener("click", getWeatherData.bind(null, baseUrl, credentials));
// button.addEventListener("click", getZipCode);

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

async function getWeatherData(base, credentials) {
  const zipCode = getZipCode();
  const country = "de"; // Germany
  fullUrl = `${base}?zip=${zipCode},${country}&units=metric&${credentials}`;
  const response = await fetch(fullUrl);
  const res = await response.json();
  console.log(`Current temperature in ${res["name"]} is ${res["main"]["temp"]}°C`);
}

function getZipCode() {
  const zipCode = document.querySelector("#zip").value;
  return zipCode;
}
