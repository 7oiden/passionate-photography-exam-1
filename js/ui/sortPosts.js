import { renderPosts } from "./renderPosts.js";

const navbar = document.querySelector(".trigger-menu");
const articlesHeading = document.querySelector("#articles-heading");
const selectDropdown = document.querySelector("#archive");

export function sortPosts(posts) {
  function sortByMonth(event) {
    window.scrollTo(0, 0);
    navbar.classList.remove("scroll-down");
    navbar.classList.add("scroll-up");

    const sortValue = event.target.value.trim().toLowerCase();

    articlesHeading.innerHTML = "Articles archive";

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
