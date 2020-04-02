/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

let button = document.querySelector("#generate");
button.addEventListener("click", getRequest);

async function getRequest() {
  const response = await fetch("/test-get", {
    method: "GET",
    credentials: "same-origin",
  });
  const responseData = await response.text();
  console.log(responseData);
}
