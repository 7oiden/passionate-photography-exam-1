import { renderPosts } from "./renderPosts.js";

const navbar = document.querySelector(".trigger-menu");
const articlesHeading = document.querySelector("#articles-heading");

export function searchPosts(posts) {
  const searchInput = document.querySelector("#search-input");
  const searchForm = document.querySelector("#search-form");

  function submitSearchForm(event) {
    event.preventDefault();
    window.scrollTo(0, 0);
    navbar.classList.remove("scroll-down");
    navbar.classList.add("scroll-up");

    articlesHeading.innerHTML = "Search result";

    const searchValue = searchInput.value.trim().toLowerCase();

    if(searchValue.trim() === "") {
      articlesHeading.innerHTML = "All articles";
    }

    const filteredPosts = posts.filter(function (post) {
      if (
        post.title.rendered.toLowerCase().includes(searchValue) ||
        post.excerpt.rendered.toLowerCase().includes(searchValue)
      ) {
        return true;
      }
    });

    renderPosts(filteredPosts);
  }
  searchForm.addEventListener("submit", submitSearchForm);
}
