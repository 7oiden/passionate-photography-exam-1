//hide navbar on scroll
export default function navbarFunc() {
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

    if (
      currentScroll > lastScroll &&
      !navbar.classList.contains("scroll-down")
    ) {
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
}
