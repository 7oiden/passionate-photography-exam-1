import { renderPosts } from "./renderPosts.js";

const navbar = document.querySelector(".trigger-menu");
const articlesHeading = document.querySelector("#articles-heading");
const selectDropdown = document.querySelector("#archive");
const categoryForm = document.querySelector("#category-form");
const searchForm = document.querySelector("#search-form");

// const htmlSelector = document.querySelectorAll("html");

export function sortPostsByMonth(posts) {
  // if (htmlSelector !== "list-of-posts") {
  //   window.location.href = "list_of_posts.html";
  // }
  function sortByMonth(event) {
    window.scrollTo(0, 0);
    navbar.classList.remove("scroll-down");
    navbar.classList.add("scroll-up");
    searchForm.reset();
    categoryForm.reset();

    const sortValue = event.target.value.trim().toLowerCase();

    articlesHeading.innerHTML = "Articles by month";

    // console.log(sortValue);

    const filteredPosts = posts.filter(function (post) {
      if (post.formatted_date.toLowerCase().includes(sortValue)) {
        return true;
      }
    });
    if (sortValue === "all") {
      articlesHeading.innerHTML = "All articles";
      renderPosts(posts);
    } else {
      renderPosts(filteredPosts);
    }
  }

  selectDropdown.addEventListener("change", sortByMonth);
}
