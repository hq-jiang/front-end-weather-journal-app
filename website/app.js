/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let NEWDATE = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


BASEURL = "http://api.openweathermap.org/data/2.5/weather";
CREDENTIALS = "APPID=cb23854f95face62703a8ce74dc109f1";

let button = document.querySelector("#generate");
// button.addEventListener("click", getRequest);
// button.addEventListener("click", postRequest);
// button.addEventListener("click", getWeatherData.bind(null, baseUrl, credentials));
// button.addEventListener("click", getFeelsText);
button.addEventListener("click", postData);

async function postData () {
  try {
    const projectData = await collectData();
    console.log(projectData);
  } catch (error) {
    console.error(error);
  }
}

async function collectData() {
  let projectData = {};

  // Collect project data
  projectData.weather = await getWeatherData(BASEURL, CREDENTIALS);
  projectData.date = NEWDATE;
  projectData.feels = getFeelsText();
  return projectData;

}

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
  if (res.cod == 400 || res.cod == 404) {
    throw "getWeatherData: "+res.message;
  }
  temp = res.main.temp;
  city = res.name;
  return `Current temperature in ${city} is ${temp}°C`;
}

function getZipCode() {
  const zipCode = document.querySelector("#zip").value;
  return zipCode;
}

function getFeelsText() {
  const feelsText = document.querySelector("#feelings").value;
  console.log(feelsText);
  return feelsText;
}
