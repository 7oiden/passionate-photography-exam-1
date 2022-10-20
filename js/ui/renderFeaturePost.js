import { commentIcon } from "../settings/constants.js";

const featureWrapper = document.querySelector(".feature-wrapper");

export function renderFeaturePost(posts) {
  featureWrapper.innerHTML = "";

  posts.forEach((post) => {
    const repliesArray = post._embedded.replies;
    let numReplies = 0;

    if (repliesArray) {
      for (let i = 0; i < repliesArray.length; i++) {
        numReplies = repliesArray[i].length;
      }
    }

    const category = post._embedded["wp:term"][0][0].name;

    const mediaArray = post._embedded["wp:featuredmedia"];

    mediaArray.forEach((media) => {
      featureWrapper.innerHTML += `
     <div class="feature-container">
     <a href="specific_post.html?id=${post.id}">
     <figure class="feature-image">
     <img class="feature-image" src="${media.source_url}" alt="${media.alt_text}"/>
     </figure>
     <h4 class="feature-heading">${post.title.rendered}</h4>
     <div class="info-container">
     <p class="info">${category}</p>
     <p class="info">${post.formatted_date}</p>
     <div class="icon-wrapper">
     ${commentIcon}
     <p>${numReplies}</p>
     </div>
     </div>
     <div class="feature-text">${post.excerpt.rendered}</div>
     </a>
     </div>`;
    });
  });
}
