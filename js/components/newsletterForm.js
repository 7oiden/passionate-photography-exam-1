const form = document.querySelector("#newsletter-form");
const subscribeMessage = document.querySelector(".subscribe-message");
// const subscribeButton = document.querySelector("#subscribe-button");
const newsletterEmail = document.querySelector("#newsletter-email");
const emailError = document.querySelector("#email-error");

export default function newsletterForm() {
  function checkInput() {
    if (validateEmail(newsletterEmail.value)) {
      emailError.style.display = "none";
    }
  }

  newsletterEmail.addEventListener("keyup", checkInput);

  function validateForm(event) {
    event.preventDefault();

    if (validateEmail(newsletterEmail.value)) {
      emailError.style.display = "none";
    } else {
      emailError.style.display = "block";
    }
    if (validateEmail(newsletterEmail.value)) {
      subscribeMessage.innerHTML = `<p id="subscribe-message">Welcome! Please check your inbox</p>`;
      contactForm.reset();

      setTimeout(function () {
        subscribeMessage.innerHTML = "";
      }, 3000);
    }
  }

  form.addEventListener("submit", validateForm);

  function validateEmail(newsletterEmail) {
    const regEx = /\S+@\S+\.\S+/;
    const patternMatches = regEx.test(newsletterEmail);
    return patternMatches;
  }
}
