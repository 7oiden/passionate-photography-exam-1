import { commentIcon } from "../settings/constants.js";

const postsWrapper = document.querySelector(".post-wrapper");

//important! this variable is redeclared at common_scripts.js
var htmlSelector = document.querySelectorAll("html");

export function renderPosts(posts) {
  postsWrapper.innerHTML = "";

  // sets number of slides in slideshow to 8
  let renderedPosts = posts;

  if (posts.length >= 8 && htmlSelector[0].className === "index-page") {
    renderedPosts = posts.slice(0, 8);
  }

  console.log(renderedPosts);

  renderedPosts.forEach((post) => {
    const repliesArray = post._embedded.replies;
    let numReplies = 0;

    if (repliesArray) {
      for (let i = 0; i < repliesArray.length; i++) {
        numReplies = repliesArray[i].length;
      }
    }

    const categoriesArray = post.categories;

    let categoryName;
    let category = post.categories[0];

    if (categoriesArray.length === 0) {
      categoryName = "Unspecified";
    } else {
      switch (category) {
        case 5:
          categoryName = "Black & white";
          break;
        case 4:
          categoryName = "Portrait";
          break;
        case 3:
          categoryName = "Landscape";
          break;
        case 2:
          categoryName = "Street";
          break;
        case 1:
          categoryName = "Unspecified"
      }
    }

    const mediaArray = post._embedded["wp:featuredmedia"];

    mediaArray.forEach((media) => {
      postsWrapper.innerHTML += `
        <div class="post-container" id="gradient-border">
        <a href="specific_post.html?id=${post.id}">
        <figure class="post-image">
        <img class="post-image" src="${media.source_url}" alt="${media.alt_text}"/>
        </figure>
        <div class="card">
        <h2 class="dynamic-header post-heading">${post.title.rendered}</h2>
        <div class="info-container card-info">
        <p class="info">${categoryName}</p>
        <p class="info">${post.formatted_date}</p>
        <div class="icon-wrapper">
        ${commentIcon}
        <p>${numReplies}</p>
        </div>
        </div>
        </div>
        <div class="post-text">${post.excerpt.rendered}</div>
        </a>
        </div>
     `;
    });
  });
}
