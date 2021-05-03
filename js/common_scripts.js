//mobile dropdown menu

const hamburgerMenu = document.querySelector("#hamburger-menu");
const mobileMenu = document.querySelector(".mobile-menu");

function mobileMenuDropdown() {
  if (mobileMenu.style.display === "flex") {
    mobileMenu.style.display = "none";
  } else {
    mobileMenu.style.display = "flex";
  }
}

hamburgerMenu.addEventListener("click", mobileMenuDropdown);

//newsletter

const newsletterForm = document.querySelector("#newsletter-form");
const subscribeMessage = document.querySelector(".subscribe-message");
const subscribeButton = document.querySelector("#subscribe-button");
const newsletterEmail = document.querySelector("#newsletter-email");
const emailError = document.querySelector("#email-error");

function checkInput() {
  if (validateEmail(newsletterEmail.value)) {
    emailError.style.visibility = "hidden";
  }
}

newsletterEmail.addEventListener("keyup", checkInput);

function validateForm(event) {
  event.preventDefault();

  if (validateEmail(newsletterEmail.value)) {
    emailError.style.visibility = "hidden";
  } else {
    emailError.style.visibility = "visible";
  }
  if (validateEmail(newsletterEmail.value)) {
    subscribeMessage.innerHTML = `<p id="subscribe-message">Welcome! Please check your inbox</p>`;
    //newsletterForm.reset();
  }
}

newsletterForm.addEventListener("submit", validateForm);

function validateEmail(newsletterEmail) {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(newsletterEmail);
  return patternMatches;
}
