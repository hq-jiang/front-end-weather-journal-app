/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let NEWDATE = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


BASEURL = "http://api.openweathermap.org/data/2.5/weather";
CREDENTIALS = "APPID=cb23854f95face62703a8ce74dc109f1";

let button = document.querySelector("#generate");
// button.addEventListener("click", testGetRequest);
// button.addEventListener("click", testPostRequest);
button.addEventListener("click", postData);

async function postData () {
  try {
    const projectDataEntry = await collectData();

    const response = await fetch("/projectdata", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(projectDataEntry)
    });

    updateUI();

  } catch (error) {
    console.error(error);
  }
}

async function updateUI () {
  const responseData = await getData();
  console.log(responseData);
  console.log("GET data from server", await getData());
  dateDiv = document.querySelector("#date");
  weatherDiv = document.querySelector("#weather");
  contentDiv = document.querySelector("#content");

  mostRecentData = responseData[responseData.length-1];
  dateDiv.textContent = mostRecentData.date;
  weatherDiv.textContent = mostRecentData.weather;
  contentDiv.textContent = mostRecentData.feels;
}

async function getData () {
  try {
    const response = await fetch("/projectdata", {
      method: "GET",
      credentials: "same-origin",
    });
    const responseData = await response.json();
    return responseData;
  } catch (error) {

  }
}

async function collectData() {
  let projectDataEntry = {};

  // Collect project data
  projectDataEntry.weather = await getWeatherData(BASEURL, CREDENTIALS);
  projectDataEntry.date = NEWDATE;
  projectDataEntry.feels = getFeelsText();
  return projectDataEntry;
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
  return feelsText;
}

async function testPostRequest() {
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

async function testGetRequest() {
  const response = await fetch("/test-get", {
    method: "GET",
    credentials: "same-origin",
  });
  const responseData = await response.text();
  console.log(responseData);
}
