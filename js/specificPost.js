import { postsUrl, commentsUrl } from "./settings/api.js";
import { renderSpecificPost } from "./ui/renderSpecificPost.js";
import { renderComments } from "./ui/renderComments.js";
import submitCommentForm from "./components/submitCommentForm.js";
import navbarFunc from "./components/navbarFunc.js";
import asideSection from "./asideSection.js";

navbarFunc();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const embed = "?_embed";

const specificUrl = postsUrl + id + embed;

asideSection();

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

const perPage = "&per_page=25";
const order = "&orderby=date";

const commentUrl = commentsUrl + id + perPage + order;

(async function fetchApi() {
  try {
    const response = await fetch(commentUrl);
    const json = await response.json();

    renderComments(json);
    // console.log(json);
  } catch (error) {
    console.log(error);
    displayAlert(
      "error",
      "An error has occurred when trying to retrieve the API",
      ".post-wrapper"
    );
  }
})();

submitCommentForm();

