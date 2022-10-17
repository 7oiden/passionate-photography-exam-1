import { postsUrl } from "./settings/api.js";
import displayAlert from "./components/displayAlert.js";
import { renderPosts } from "./ui/renderPosts.js";
import loadMorePosts from "./components/loadMoreButton.js";
import navbarFunc from "./components/navbarFunc.js";
import convertHeadings from "./components/convertHeadings.js";

navbarFunc();
convertHeadings();

const embed = "?_embed";
const perPage = "&per_page=15";
const order = "&orderby=date";

const url = postsUrl + embed + perPage + order;

(async function fetchApi() {
  try {
    const response = await fetch(url);
    const json = await response.json();

    renderPosts(json);
  } catch (error) {
    console.log(error);
    displayAlert(
      "error",
      "An error has occurred when trying to retrieve the API",
      ".post-wrapper"
    );
  }
})();
