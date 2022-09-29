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
      console.log(results[i].tags.length);

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
      "An error has occured when trying to retrive the API"
    );
  }
}

fetchPosts();

//convert headings
const asideHeading = document.querySelectorAll("h5");

//important! this variable is also declaired at list_of_posts.js
var htmlSelector = document.querySelectorAll("html");

if (htmlSelector[0].className === "contact-page") {
  asideHeading.forEach(function (h5) {
    h5.outerHTML = "<h2>" + h5.innerHTML + "</h2>";
  });
}

if (
  htmlSelector[0].className === "about-page" ||
  htmlSelector[0].className === "list-of-posts"
) {
  asideHeading.forEach(function (h5) {
    h5.outerHTML = "<h3>" + h5.innerHTML + "</h3>";
  });
}

if (htmlSelector[0].className === "specific-post") {
  asideHeading.forEach(function (h5) {
    h5.outerHTML = "<h4>" + h5.innerHTML + "</h4>";
  });
}
