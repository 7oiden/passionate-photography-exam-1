import { postsUrl } from "./settings/api.js";
import displayAlert from "./components/displayAlert.js";
import { renderPosts } from "./ui/renderPosts.js";
// import loadMorePosts from "./components/loadMoreButton.js";
import navbarFunc from "./components/navbarFunc.js";
import asideSection from "./asideSection.js";
import { searchPosts } from "./ui/searchPosts.js";

navbarFunc();

const embed = "?_embed";
const perPage = "&per_page=25";
const order = "&orderby=date";

const url = postsUrl + embed + perPage + order;

(async function fetchApi() {
  try {
    const response = await fetch(url);
    const json = await response.json();

    renderPosts(json);
    searchPosts(json);
  } catch (error) {
    console.log(error);
    displayAlert(
      "error",
      "An error has occurred when trying to retrieve the API",
      ".post-wrapper"
    );
  }
})();

asideSection();
