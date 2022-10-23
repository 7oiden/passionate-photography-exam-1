const scrollIcon = document.querySelector("#scroll-top-icon");
const navbar = document.querySelector(".trigger-menu");

export default function scrollToTop() {
  let options = {
    root: null,
    threshold: [0.75],
  };

  function showToTop(entryArray) {
    let div = document.querySelector(".scroll-top-container");
    entryArray[0].isIntersecting
      ? (div.style.display = "none")
      : (div.style.display = "block");
  }

  let observer = new IntersectionObserver(showToTop, options);
  observer.observe(document.querySelector("h1"));

  function scrollTrigger() {
    navbar.classList.remove("scroll-down");
    navbar.classList.add("scroll-up");
    window.scrollTo(0, 0);
  }
  scrollIcon.addEventListener("click", scrollTrigger);
}
