import { postsUrl } from "./settings/api.js";
import displayAlert from "./components/alerts/displayAlert.js";
import { renderFeaturePost } from "./ui/renderFeaturePost.js";
import { renderPosts } from "./ui/renderPosts.js";
import navbarFunc from "./components/navbar/navbarFunc.js";
import asideSection from "./ui/asideSection.js";

navbarFunc();

const embed = "?_embed";
// const perPage = "&per_page=15";
// const order = "&orderby=date";

const url = postsUrl + embed;

(async function fetchApi() {
  try {
    const response = await fetch(url);
    const json = await response.json();

    const featurePost = json.filter(function (post) {
      if (post.tags.length >= 2) {
        return true;
      }
    });
    renderFeaturePost(featurePost);
    renderPosts(json);
  } catch (error) {
    console.log(error);
    displayAlert(
      "error",
      "An error has occurred when trying to retrieve the API",
      ".feature-wrapper"
    );
  }
})();

asideSection();

//carousel
const slider = document.querySelector(".post-wrapper");
const indicatorCircles = document.querySelector(".circle-wrapper");
const circles = document.querySelectorAll(".circle");
const previous = document.querySelector(".previous");
const next = document.querySelector(".next");

let sliderIndex = 0;

let percentage = 0;

if (window.innerWidth < 768) {
  percentage = -12.5;
} else if (window.innerWidth >= 768) {
  percentage = -25;
}

let windowWidth = 0;

function resizeListener() {
  windowWidth = window.innerWidth;

  if (windowWidth < 768) {
    percentage = -12.5;
  } else if (windowWidth >= 768) {
    percentage = -25;
  }
}

window.addEventListener("resize", resizeListener);

circles.forEach(function (indicator, circleIndex) {
  indicator.addEventListener("click", function () {
    sliderIndex = circleIndex;
    document.querySelector(".selected").classList.remove("selected");
    indicator.classList.add("selected");
    slider.style.transform = "translate(" + circleIndex * percentage + "%)";
  });
});

previous.addEventListener("click", function () {
  sliderIndex = sliderIndex > 0 ? sliderIndex - 1 : 0;
  document.querySelector(".selected").classList.remove("selected");
  indicatorCircles.children[sliderIndex].classList.add("selected");
  slider.style.transform = "translate(" + sliderIndex * percentage + "%)";
});

next.addEventListener("click", function () {
  sliderIndex = sliderIndex < 3 ? sliderIndex + 1 : 3;
  document.querySelector(".selected").classList.remove("selected");
  indicatorCircles.children[sliderIndex].classList.add("selected");
  slider.style.transform = "translate(" + sliderIndex * percentage + "%)";
});
