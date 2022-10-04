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
  if (checkLength(fullName.value, 4)) {
    nameError.style.display = "none";
  } else {
    nameError.style.display = "block";
  }
  if (validateEmail(contactEmail.value)) {
    contactEmailError.style.display = "none";
  } else {
    contactEmailError.style.display = "block";
  }
  if (checkLength(subject.value, 14)) {
    subjectError.style.display = "none";
  } else {
    subjectError.style.display = "block";
  }

  if (checkLength(message.value, 24)) {
    messageError.style.display = "none";
  } else {
    messageError.style.display = "block";
  }
}

fullName.addEventListener("keyup", checkContactInput);
contactEmail.addEventListener("keyup", checkContactInput);
subject.addEventListener("keyup", checkContactInput);
message.addEventListener("keyup", checkContactInput);

function validateContactForm(event) {
  event.preventDefault();

  if (checkLength(fullName.value, 4)) {
    nameError.style.display = "none";
  } else {
    nameError.style.display = "block";
  }
  if (validateEmail(contactEmail.value)) {
    contactEmailError.style.display = "none";
  } else {
    contactEmailError.style.display = "block";
  }
  if (checkLength(subject.value, 14)) {
    subjectError.style.display = "none";
  } else {
    subjectError.style.display = "block";
  }
  if (checkLength(message.value, 24)) {
    messageError.style.display = "none";
  } else {
    messageError.style.display = "block";
  }
  if (
    checkLength(fullName.value, 4) &&
    validateEmail(contactEmail.value) &&
    checkLength(subject.value, 14) &&
    checkLength(message.value, 24)
  ) {
    successMessage.innerHTML = `<p id="success-message">Your request was submitted successfully</p>`;
    contactForm.reset();

    setTimeout(function () {
      successMessage.innerHTML = "";
    }, 3000);
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
