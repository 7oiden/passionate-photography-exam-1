import { renderPosts } from "../../ui/renderPosts.js";

const navbar = document.querySelector(".trigger-menu");
const articlesHeading = document.querySelector("#articles-heading");
const selectDropdown = document.querySelector("#categories");
const archiveForm = document.querySelector("#archive-form");
const searchForm = document.querySelector("#search-form");

export function sortPostsByCategory(posts) {
  function sortByCategory() {
    window.scrollTo(0, 0);
    navbar.classList.remove("scroll-down");
    navbar.classList.add("scroll-up");
    searchForm.reset();
    archiveForm.reset();

    const sortValue = selectDropdown.value.trim().toLowerCase();

    console.log(archive.value);

    articlesHeading.innerHTML = "Articles by category";

    const filteredPosts = posts.filter(function (post) {
      const category = post._embedded["wp:term"][0][0].name;
      if (category.toLowerCase().trim().includes(sortValue)) {
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

  selectDropdown.addEventListener("change", sortByCategory);
}
