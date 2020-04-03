// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
const server = app.listen(port, serverActiveMessage);

function serverActiveMessage() {
  console.log("Server running");
  console.log(`Listening to connections at http://localhost:${port}`);
}

// GET request for projectData
app.get("/projectdata", respondProjectData);
function respondProjectData (request, response) {
  console.log("Received a GET request on projectData route");
  response.send(projectData);
}

// POST request for projectData
app.post("/projectdata", processProjectData);
function processProjectData(request, response) {
  console.log("Received a POST request on projectData route");
  projectData.push(request.body);
  console.log(projectData);
  response.send("POST received on projectData route");
}

// Test GET request
app.get("/test-get", getCallback);
function getCallback(request, response) {
  console.log("Received a get request");
  response.send("GET received on test route");
  // response.send({"answer": 42});
}

// Test POST request
app.post("/test-post", postCallback);
function postCallback(request, response) {
  console.log("Received a get request");
  console.log(request.body);
  response.send("POST received on test route");
}
