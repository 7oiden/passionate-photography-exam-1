const scrollIcon = document.querySelector("#scroll-top-icon");
const navbar = document.querySelector(".trigger-menu");

export default function scrollToTop() {
  let options = {
    root: null,
    threshold: [0.75],
  };

  function showToTop(entryArray) {
    let iconContainer = document.querySelector(".scroll-top-container");
    entryArray[0].isIntersecting
      ? (iconContainer.style.display = "none")
      : (iconContainer.style.display = "block");
  }

  let observer = new IntersectionObserver(showToTop, options);
  observer.observe(document.querySelector("h1"));

  function scrollTrigger() {
    navbar.classList.remove("scroll-down");
    navbar.classList.add("scroll-up");
    window.scrollTo(0, 0);
  }
  scrollIcon.addEventListener("click", scrollTrigger);

  const footerObserver = new IntersectionObserver((entries) => {
    let iconContainer = document.querySelector(".scroll-top-container");
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        iconContainer.classList.add("scroll-icon-up");
        iconContainer.classList.remove("scroll-icon-down");
        return;
      }
      iconContainer.classList.remove("scroll-icon-up");
      iconContainer.classList.add("scroll-icon-down");
    });
  });

  footerObserver.observe(document.querySelector("footer"));
}
