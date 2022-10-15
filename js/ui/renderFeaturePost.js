const featureWrapper = document.querySelector(".feature-wrapper");

const commentIcon = `<svg class="comment-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4l0 0 0 0 0 0 0 0 .3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z"/></svg>`;

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
          categoryName = "Uncategorized";
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
