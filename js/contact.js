// contact form

const contactForm = document.querySelector("#contact-form");

const fullName = document.querySelector("#full-name");
const subject = document.querySelector("#subject");
const contactEmail = document.querySelector("#contact-email");
const message = document.querySelector("#message");

const nameError = document.querySelector("#name-error");
const subjectError = document.querySelector("#subject-error");
const contactEmailError = document.querySelector("#contact-email-error");
const messageError = document.querySelector("#message-error");

const contactButton = document.querySelector("#contact-button");

const successMessage = document.querySelector(".success-message");

function checkContactInput() {
  if (checkLength(fullName.value, 5)) {
    nameError.style.visibility = "hidden";
  } else {
    nameError.style.visibility = "visible";
  }
   if (validateEmail(contactEmail.value)) {
     contactEmailError.style.visibility = "hidden";
   } else {
     contactEmailError.style.visibility = "visible";
   }
  if (checkLength(subject.value, 15)) {
    subjectError.style.visibility = "hidden";
  } else {
    subjectError.style.visibility = "visible";
  }
 
  if (checkLength(message.value, 25)) {
    messageError.style.visibility = "hidden";
  } else {
    messageError.style.visibility = "visible";
  }
}

fullName.addEventListener("keyup", checkContactInput);
contactEmail.addEventListener("keyup", checkContactInput);
subject.addEventListener("keyup", checkContactInput);
message.addEventListener("keyup", checkContactInput);

function validateContactForm(event) {
  event.preventDefault();
  console.log("hi");

  if (checkLength(fullName.value, 5)) {
    nameError.style.visibility = "hidden";
  } else {
    nameError.style.visibility = "visible";
  }
  if (validateEmail(contactEmail.value)) {
    contactEmailError.style.visibility = "hidden";
  } else {
    contactEmailError.style.visibility = "visible";
  }
  if (checkLength(subject.value, 15)) {
    subjectError.style.visibility = "hidden";
  } else {
    subjectError.style.visibility = "visible";
  }
  if (checkLength(message.value, 25)) {
    messageError.style.visibility = "hidden";
  } else {
    messageError.style.visibility = "visible";
  }
  if (
    checkLength(fullName.value, 5) &&
    validateEmail(contactEmail.value) &&
    checkLength(subject.value, 15) &&
    checkLength(message.value, 25)
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
