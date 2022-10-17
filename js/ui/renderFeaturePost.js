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
          categoryName = "Unspecified";
          break;
      }
    }

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
     <p class="info">${categoryName}</p>
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
