import { renderPosts } from "./renderPosts.js";

const navbar = document.querySelector(".trigger-menu");
const articlesHeading = document.querySelector("#articles-heading");
const categoryForm = document.querySelector("#category-form");
const archiveForm = document.querySelector("#archive-form");

export function searchPosts(posts) {
  const searchInput = document.querySelector("#search-input");
  const searchForm = document.querySelector("#search-form");

  function submitSearchForm(event) {
    event.preventDefault();
    window.scrollTo(0, 0);
    navbar.classList.remove("scroll-down");
    navbar.classList.add("scroll-up");
    categoryForm.reset();
    archiveForm.reset();

    articlesHeading.innerHTML = "Search result";

    const searchValue = searchInput.value.trim().toLowerCase();

    if (searchValue.trim() === "") {
      articlesHeading.innerHTML = "All articles";
    }

    if (searchValue === "all") {
      renderPosts(posts);
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
