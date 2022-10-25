import { postsUrl } from "../settings/api.js";
import displayAlert from "../components/alerts/displayAlert.js";
import { renderAsideLists } from "./renderAsideLists.js";
import validateNewsletterForm from "../components/forms/validateNewsletterForm.js";
import convertHeadings from "../components/utils/convertHeadings.js";
import scrollToTop from "../components/utils/scrollToTop.js";

const recentPosts = document.querySelector(".recent-posts-list");
const featuredPosts = document.querySelector(".featured-posts-list");

export default function asideSection() {
  convertHeadings();

  const embed = "?_embed";
  const perPage = "&per_page=15";
  const order = "&orderby=date";

  const url = postsUrl + embed + perPage + order;

  (async function fetchApi() {
    try {
      const response = await fetch(url);
      const json = await response.json();

      renderAsideLists(json);
    } catch (error) {
      displayAlert("aside-alert", "Could not be loaded...", ".recent-posts-list");
      displayAlert("aside-alert", "Could not be loaded...", ".featured-posts-list");
    }
  })();

  validateNewsletterForm();
  scrollToTop();
}
