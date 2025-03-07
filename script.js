const menuList = document.getElementById("menuList");

function toggleMenu() {
  if (menuList.style.maxHeight === "0px" || menuList.style.maxHeight === "") {
    menuList.style.maxHeight = "300px";
  } else {
    menuList.style.maxHeight = "0px";
  }
}

// Selections
const destinationField = document.querySelector("#destination");
const startDateField = document.querySelector("#startDate");
const endDateField = document.querySelector("#endDate");
const preferencesField = document.querySelector("#preferences");
const commentsField = document.querySelector("#comments");
const submitButton = document.getElementById("tripDetailsButton");

// Error message elements
const destinationError = document.querySelector("#destinationError");
const startDateError = document.querySelector("#startDateError");
const endDateError = document.querySelector("#endDateError");
const preferenceError = document.querySelector("#preferenceError");

// Function to toggle the submit button based on form validity
const toggleSubmitButton = () => {
  const isValid =
    destinationField.value.trim().length > 0 &&
    startDateField.value.trim().length > 0 &&
    endDateField.value.trim().length > 0 &&
    new Date(startDateField.value) <= new Date(endDateField.value) &&
    preferencesField.value !== "default";

  // Disable the submit button if form is not valid
  if(isValid===false){
    submitButton.disabled=true;
    submitButton.style.cursor="not-allowed";
}
else
{
    submitButton.disabled=false;
    submitButton.style.cursor="pointer";
}
};

// Function to display error messages
const showError = (element, errorMessage) => {
  element.textContent = errorMessage;
  element.style.display = "block";
};

// Function to hide error messages
const hideError = (element) => {
  element.style.display = "none";
};

// Function to validate the form
const validateForm = (e) => {
  e.preventDefault();

  hideError(destinationError);
  hideError(startDateError);
  hideError(endDateError);
  hideError(preferenceError);

  let isValid = true;

  if (destinationField.value.trim().length === 0) {
    showError(destinationError, "Destination field cannot be empty.");
    destinationField.classList.add("invalid");
    isValid = false;
  } else {
    destinationField.classList.remove("invalid");
  }

  if (startDateField.value.trim().length === 0) {
    showError(startDateError, "Start date cannot be empty.");
    startDateField.classList.add("invalid");
    isValid = false;
  } else {
    startDateField.classList.remove("invalid");
  }

  if (endDateField.value.trim().length === 0) {
    showError(endDateError, "End date cannot be empty.");
    endDateField.classList.add("invalid");
    isValid = false;
  } else if (new Date(startDateField.value) > new Date(endDateField.value)) {
    showError(endDateError, "End date cannot be before the start date.");
    endDateField.classList.add("invalid");
    isValid = false;
  } else {
    endDateField.classList.remove("invalid");
  }

  if (preferencesField.value === "default") {
    showError(preferenceError, "Please select a valid preference.");
    preferencesField.classList.add("invalid");
    isValid = false;
  } else {
    preferencesField.classList.remove("invalid");
  }

  toggleSubmitButton();

  if (isValid) {
    alert("Form Submitted.");
    console.log("Form is valid!");
  }
};
// Event listener for the "Explore" button
if (submitButton) {
  submitButton.addEventListener("click", (e) => {
    validateForm(e);
  });
}

// Event listeners for all form fields to check validity on user input
destinationField.addEventListener("input", toggleSubmitButton);
startDateField.addEventListener("input", toggleSubmitButton);
endDateField.addEventListener("input", toggleSubmitButton);
preferencesField.addEventListener("change", toggleSubmitButton);

// Disable the submit button by default until validation passes
toggleSubmitButton();

document.addEventListener("DOMContentLoaded", function () {
  const hamburgerIcon = document.getElementById("hamburger-icon");
  const navs = document.getElementById("navs");

  hamburgerIcon.addEventListener("click", function () {
    navs.classList.toggle("active");
  });
});
