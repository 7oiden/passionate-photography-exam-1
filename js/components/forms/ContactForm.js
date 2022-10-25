import displayAlert from "../alerts/displayAlert.js";
import validateContactForm from "./validateContactForm.js";
import { checkLength, validateEmail } from "./formValidators.js";
import { contactUrl } from "../../settings/api.js";

const contactForm = document.querySelector("#contact-form");
const fullName = document.querySelector("#full-name");
const contactEmail = document.querySelector("#contact-email");
const subject = document.querySelector("#subject");
const message = document.querySelector("#message");
const alertContainer = document.querySelector(".alert-container");

export default function commentForm() {
  function submitContactForm(event) {
    event.preventDefault();

    alertContainer.innerHTML = "";

    const nameValue = fullName.value.trim();
    const emailValue = contactEmail.value.trim();
    const subjectValue = subject.value.trim();
    const messageValue = message.value.trim();

    validateContactForm();

    if (
      checkLength(nameValue, 4) &&
      validateEmail(emailValue) &&
      checkLength(subjectValue, 14) &&
      checkLength(messageValue, 24)
    ) {
      addContactInfo(nameValue, emailValue, subjectValue, messageValue);
    } else {
      displayAlert(
        "warning",
        "Please attend to input errors",
        ".alert-container"
      );

      setTimeout(function () {
        alertContainer.innerHTML = "";
      }, 3000);
    }

    async function addContactInfo(name, email, subject, message) {
      const jsonData = {
        "your-name": name,
        "your-email": email,
        "your-subject": subject,
        "your-message": message,
      };

      const formData = new FormData();
      for (const field in jsonData) {
        formData.append(field, jsonData[field]);
      }

      const options = {
        method: "POST",
        body: formData,
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
      };

      try {
        const response = await fetch(contactUrl, options);
        const json = await response.json();

        console.log(json);

        if (json.status === "mail_sent") {
          displayAlert("success", json.message, ".alert-container");

          setTimeout(function () {
            alertContainer.innerHTML = "";
          }, 3000);

          contactForm.reset();
        }

        if (json.status !== "mail_sent") {
          displayAlert("error", json.message, ".alert-container");
        }
      } catch (error) {
        console.log(error);
        displayAlert("error", "Something went wrong!", ".alert-container");
      }
    }
  }
  contactForm.addEventListener("submit", submitContactForm);
}
