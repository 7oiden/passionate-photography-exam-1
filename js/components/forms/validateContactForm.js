import { checkLength, validateEmail } from "./formValidators.js";

export default function validateContactForm() {
  const fullName = document.querySelector("#full-name");
  const subject = document.querySelector("#subject");
  const contactEmail = document.querySelector("#contact-email");
  const message = document.querySelector("#message");
  const nameError = document.querySelector("#name-error");
  const subjectError = document.querySelector("#subject-error");
  const contactEmailError = document.querySelector("#contact-email-error");
  const messageError = document.querySelector("#message-error");

  let value = "";
  let len = 0;

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

  checkLength(value, len);
  validateEmail(contactEmail);
}
