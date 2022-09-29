//carousel
const slider = document.querySelector(".post-wrapper");
const indicatorCircles = document.querySelector(".circle-wrapper");
const circles = document.querySelectorAll(".circle");
const previous = document.querySelector(".previous");
const next = document.querySelector(".next");

let sliderIndex = 0;

circles.forEach(function (indicator, circleIndex) {
  indicator.addEventListener("click", function () {
    sliderIndex = circleIndex;
    document.querySelector(".selected").classList.remove("selected");
    indicator.classList.add("selected");
    slider.style.transform = "translate(" + circleIndex * -25 + "%)";
  });
});

previous.addEventListener("click", function () {
  sliderIndex = sliderIndex > 0 ? sliderIndex - 1 : 0;
  document.querySelector(".selected").classList.remove("selected");
  indicatorCircles.children[sliderIndex].classList.add("selected");
  slider.style.transform = "translate(" + sliderIndex * -25 + "%)";
});

next.addEventListener("click", function () {
  sliderIndex = sliderIndex < 3 ? sliderIndex + 1 : 3;
  document.querySelector(".selected").classList.remove("selected");
  indicatorCircles.children[sliderIndex].classList.add("selected");
  slider.style.transform = "translate(" + sliderIndex * -25 + "%)";
});
