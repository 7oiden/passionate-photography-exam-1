import { postsUrl } from "./settings/api.js";
import displayAlert from "./components/displayAlert.js";
import { renderPostLists } from "./ui/renderPostLists.js";
import newsletterForm from "./components/newsletterForm.js";
import convertHeadings from "./components/convertHeadings.js";

convertHeadings();

const embed = "?_embed";
const perPage = "&per_page=15";
const order = "&orderby=date";

const url = postsUrl + embed + perPage + order;

(async function fetchApi() {
  try {
    const response = await fetch(url);
    const json = await response.json();

    renderPostLists(json);
  } catch (error) {
    console.log(error);
    displayAlert(
      "error",
      "An error has occurred when trying to retrieve the API",
      ".post-wrapper"
    );
  }
})();

newsletterForm();
