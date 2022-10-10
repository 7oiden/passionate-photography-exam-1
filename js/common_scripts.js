//remove logo on scroll
const navbar = document.querySelector(".trigger-menu");

const hamburgerMenu = document.querySelector("#hamburger-menu");
const mobileMenu = document.querySelector(".mobile-menu");

// const logo = document.querySelector(".logo")

let lastScroll = 0;

function toggleNavbar() {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    navbar.classList.remove("scroll-up");
    return;
  }

  if (mobileMenu.classList.contains("dropdown-show")) {
    navbar.classList.remove("scroll-up");
    return;
  }

  if (currentScroll > lastScroll && !navbar.classList.contains("scroll-down")) {
    // down
    navbar.classList.remove("scroll-up");
    navbar.classList.add("scroll-down");
  } else if (
    currentScroll < lastScroll &&
    navbar.classList.contains("scroll-down")
  ) {
    // up
    navbar.classList.remove("scroll-down");
    navbar.classList.add("scroll-up");
  }
  lastScroll = currentScroll;
  // console.log(window.pageYOffset);
}

window.addEventListener("scroll", toggleNavbar);

//mobile dropdown menu

// function mobileMenuDropdown() {
//   if (mobileMenu.style.display === "flex") {
//     mobileMenu.style.display = "none";
//   } else {
//     mobileMenu.style.display = "flex";
//   }
// }

function mobileMenuDropdown() {
  if (mobileMenu.classList.contains("dropdown-hide")) {
    mobileMenu.classList.remove("dropdown-hide");
    mobileMenu.classList.add("dropdown-show");
  } else {
    mobileMenu.classList.remove("dropdown-show");
    mobileMenu.classList.add("dropdown-hide");
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

newsletterForm.addEventListener("submit", validateForm);

function validateEmail(newsletterEmail) {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(newsletterEmail);
  return patternMatches;
}

//aside
//featured posts and recent posts
const recentPosts = document.querySelector(".recent-posts-list");
const featuredPosts = document.querySelector(".featured-posts-list");

const recentPostsUrl =
  "http://7oiden.com/passionate-photography/wp-json/wp/v2/posts/?_embed&per_page=12&orderby=date&per_page=15";

const corsFix = "https://noroffcors.herokuapp.com/" + recentPostsUrl;

async function fetchPosts() {
  try {
    const response = await fetch(corsFix);
    const results = await response.json();

    recentPosts.innerHTML = "";

    for (let i = 0; i < results.length; i++) {
      // console.log(results[i].tags.length);

      if (results[i].tags.length > 0) {
        featuredPosts.innerHTML += `
      <li><a href="specific_post.html?id=${results[i].id}">${results[i].title.rendered}</a></li>
      `;
      }
    }

    for (let j = 0; j < results.length; j++) {
      if (j >= 4) {
        break;
      }
      recentPosts.innerHTML += `
      <li><a href="specific_post.html?id=${results[j].id}">${results[j].title.rendered}</a></li>
      `;
    }
  } catch (error) {
    console.log(error);
    resultsContainer.innerHTML = displayError(
      "An error has occurred when trying to retrieve the API"
    );
  }
}

fetchPosts();

//convert headings
const asideHeading = document.querySelectorAll("h5");

//important! this variable is also declared at list_of_posts.js
var htmlSelector = document.querySelectorAll("html");

if (htmlSelector[0].className === "contact-page") {
  asideHeading.forEach(function (h5) {
    // h5.outerHTML = "<h2>" + h5.innerHTML + "</h2>";
    h5.outerHTML = `<h2 class="aside-heading">${h5.innerHTML}</h2>`;
  });
}

if (
  htmlSelector[0].className === "about-page" ||
  htmlSelector[0].className === "list-of-posts"
) {
  asideHeading.forEach(function (h5) {
    // h5.outerHTML = "<h3>" + h5.innerHTML + "</h3>";
    h5.outerHTML = `<h3 class="aside-heading">${h5.innerHTML}</h3>`;
  });
}

if (htmlSelector[0].className === "specific-post") {
  asideHeading.forEach(function (h5) {
    // h5.outerHTML = "<h4>" + h5.innerHTML + "</h4>";
    h5.outerHTML = `<h4 class="aside-heading">${h5.innerHTML}</h4>`;
  });
}
