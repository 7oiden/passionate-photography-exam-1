import { postsUrl, commentsUrl } from "./settings/api.js";
import { renderSpecificPost } from "./ui/renderSpecificPost.js";
import { renderComments } from "./ui/renderComments.js";
import commentForm from "./components/commentForm.js";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const embed = "?_embed";

const specificUrl = postsUrl + id + embed;

(async function fetchApi() {
  try {
    const response = await fetch(specificUrl);
    const json = await response.json();

    renderSpecificPost(json);
  } catch (error) {
    console.log(error);
    displayAlert(
      "error",
      "An error has occurred when trying to retrieve the API",
      ".post-wrapper"
    );
  }
})();

const commentUrl = commentsUrl + id;

(async function fetchApi() {
  try {
    const response = await fetch(commentUrl);
    const json = await response.json();

    renderComments(json);
  } catch (error) {
    console.log(error);
    displayAlert(
      "error",
      "An error has occurred when trying to retrieve the API",
      ".post-wrapper"
    );
  }
})();

commentForm();
