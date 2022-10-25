import { commentIcon } from "../settings/constants.js";
import loadMorePosts from "../components/utils/loadMorePosts.js";

const postsWrapper = document.querySelector(".post-wrapper");

const htmlSelector = document.querySelectorAll("html");

export function renderPosts(posts) {
  postsWrapper.innerHTML = "";

  // sets number of slides in slideshow to 8
  let renderedPosts = posts;

  if (posts.length >= 8 && htmlSelector[0].className === "index-page") {
    renderedPosts = posts.slice(0, 8);
  }

  // console.log(renderedPosts);

  if (renderedPosts.length === 0) {
    postsWrapper.innerHTML = `<p class="search-default">No article matches your search...</p>`;
  }

  renderedPosts.forEach((post) => {
    const repliesArray = post._embedded.replies;
    let numReplies = 0;

    if (repliesArray) {
      for (let i = 0; i < repliesArray.length; i++) {
        numReplies = repliesArray[i].length;
      }
    }

    const category = post._embedded["wp:term"][0][0].name;

    // console.log(category);

    const mediaArray = post._embedded["wp:featuredmedia"];

    mediaArray.forEach((media) => {
      postsWrapper.innerHTML += `
        <div class="post-container post-container-hide" id="gradient-border">
        <a href="specific_post.html?id=${post.id}">
        <figure class="post-image">
        <img class="post-image" src="${media.source_url}" alt="${media.alt_text}"/>
        </figure>
        </a>
        <div class="card">
        <a href="specific_post.html?id=${post.id}">
        <h2 class="dynamic-header post-heading">${post.title.rendered}</h2>
        </a>
        <div class="info-container card-info">
        <p class="info">${category}</p>
        <p class="info">${post.formatted_date}</p>
        <div class="icon-wrapper">
        ${commentIcon}
        <p>${numReplies}</p>
        </div>
        </div>
        </div>
        <div class="post-text">${post.excerpt.rendered}</div>
        </div>
     `;
    });
  });

  if (htmlSelector[0].className === "list-of-posts") {
    loadMorePosts(renderedPosts);
  }
}
