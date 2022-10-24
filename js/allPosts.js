import { postsUrl } from "./settings/api.js";
import displayAlert from "./components/displayAlert.js";
import { renderPosts } from "./ui/renderPosts.js";
// import loadMorePosts from "./components/loadMoreButton.js";
import navbarFunc from "./components/navbarFunc.js";
import asideSection from "./asideSection.js";
import { searchPosts } from "./ui/searchPosts.js";
import { sortPostsByMonth } from "./ui/sortPostsByMonth.js";
import { sortPostsByCategory } from "./ui/sortPostsByCategory.js";

navbarFunc();

const embed = "?_embed";
const perPage = "&per_page=25";
const order = "&orderby=date";

const url = postsUrl + embed + perPage + order;

const loadButton = document.querySelector("#load-button");

(async function fetchApi() {
  try {
    const response = await fetch(url);
    const json = await response.json();

    renderPosts(json);
    sortPostsByMonth(json);
    sortPostsByCategory(json);
    searchPosts(json);
    loadButton.style.display = "flex";
  } catch (error) {
    console.log(error);
    displayAlert(
      "error",
      "An error has occurred when trying to retrieve the API",
      ".post-wrapper"
    );
    loadButton.style.display = "none";
  }
})();

asideSection();
