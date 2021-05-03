// contact form

const contactForm = document.querySelector("#contact-form");

const firstName = document.querySelector("#first-name");
const lastName = document.querySelector("#last-name");
const contactEmail = document.querySelector("#contact-email");
const message = document.querySelector("#message");

const firstNameError = document.querySelector("#first-name-error");
const lastNameError = document.querySelector("#last-name-error");
const contactEmailError = document.querySelector("#contact-email-error");
const messageError = document.querySelector("#message-error");

const contactButton = document.querySelector("#contact-button");

const successMessage = document.querySelector(".success-message");

function checkContactInput() {
  if (checkLength(firstName.value, 1)) {
    firstNameError.style.visibility = "hidden";
  } else {
    firstNameError.style.visibility = "visible";
  }
  if (checkLength(lastName.value, 1)) {
    lastNameError.style.visibility = "hidden";
  } else {
    lastNameError.style.visibility = "visible";
  }
  if (validateEmail(contactEmail.value)) {
    contactEmailError.style.visibility = "hidden";
  } else {
    contactEmailError.style.visibility = "visible";
  }
  if (checkLength(message.value, 19)) {
    messageError.style.visibility = "hidden";
  } else {
    messageError.style.visibility = "visible";
  }
}

firstName.addEventListener("keyup", checkContactInput);
lastName.addEventListener("keyup", checkContactInput);
contactEmail.addEventListener("keyup", checkContactInput);
message.addEventListener("keyup", checkContactInput);

function validateContactForm(event) {
  event.preventDefault();
  console.log("hi");

  if (checkLength(firstName.value, 1)) {
    firstNameError.style.visibility = "hidden";
  } else {
    firstNameError.style.visibility = "visible";
  }
  if (checkLength(lastName.value, 1)) {
    lastNameError.style.visibility = "hidden";
  } else {
    lastNameError.style.visibility = "visible";
  }
  if (validateEmail(contactEmail.value)) {
    contactEmailError.style.visibility = "hidden";
  } else {
    contactEmailError.style.visibility = "visible";
  }
  if (checkLength(message.value, 19)) {
    messageError.style.visibility = "hidden";
  } else {
    messageError.style.visibility = "visible";
  }
  if (
    checkLength(firstName.value, 1) &&
    checkLength(lastName.value, 1) &&
    validateEmail(contactEmail.value) &&
    checkLength(message.value, 19)
  ) {
    successMessage.innerHTML = `<p id="success-message">Form was submitted successfully</p>`;
    form.reset();
  }
}

contactForm.addEventListener("submit", validateContactForm);

function checkLength(value, len) {
  if (value.trim().length > len) {
    return true;
  } else {
    return false;
  }
}

function validateEmail(contactEmail) {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(contactEmail);
  return patternMatches;
}
