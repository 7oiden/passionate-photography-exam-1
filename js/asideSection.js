import { postsUrl } from "./settings/api.js";
// import displayAlert from "./components/displayAlert.js";
import { renderAsideLists } from "./ui/renderAsideLists.js";
import validateNewsletterForm from "./components/validateNewsletterForm.js";
import convertHeadings from "./components/convertHeadings.js";
// import { sortPostsByMonth } from "./ui/sortPostsByMonth.js";
import scrollToTop from "./components/scrollToTop.js";

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
      console.log(error);
      recentPosts.innerHTML = "List could not be loaded...";
      recentPosts.style.color = "#be3e35";
      recentPosts.style.fontFamily = "lato";
      featuredPosts.innerHTML = "List could not be loaded...";
      featuredPosts.style.color = "#be3e35";
      featuredPosts.style.fontFamily = "lato";
    }
  })();

  validateNewsletterForm();
  scrollToTop();
}
