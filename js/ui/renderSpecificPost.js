import { commentIcon } from "../settings/constants.js";

const currentBreadcrumb = document.querySelector(".active");
const postContainer = document.querySelector(".post-container");

export function renderSpecificPost(details) {
  const replies = details._embedded.replies;

  document.title = `Passionate Photography | ${details.title.rendered}`;

  let numReplies = 0;

  if (replies) {
    numReplies = replies[0].length;
  }

  currentBreadcrumb.innerHTML = `${details.title.rendered}`;

  const categoriesArray = details.categories;

  let categoryName;
  let category = details.categories[0];

  if (categoriesArray.length === 0) {
    categoryName = "Unspecified";
    console.log(categoryName);
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

  postContainer.innerHTML = `
     <figure class="post-image">
     <img class="post-image" id="my-image" src="${details._embedded["wp:featuredmedia"]["0"].source_url}" alt="${details._embedded["wp:featuredmedia"]["0"].alt_text}"/>
     <figcaption>- Click image to enlarge -</figcaption>
     </figure>
     <h2 class="post-title">${details.title.rendered}</h2>
     <div class="info-container" id="gradient-border">
     <p class="info">${categoryName}</p>
     <p class="info">${details.formatted_date}</p>
     <div class="icon-wrapper">
     ${commentIcon} 
     <p>${numReplies}</p>
     </div>
     </div>
     <div class="post-text">${details.content.rendered}</div>
 `;

  ///modal
  const modal = document.querySelector(".modal");
  const modalImage = document.querySelector("#image");
  const captionText = document.querySelector("#caption");

  function openModal(event) {
    if (event.target.matches(".post-image")) {
      modal.style.display = "block";
      modalImage.src = `${details._embedded["wp:featuredmedia"]["0"].source_url}`;
      captionText.innerHTML = `${details._embedded["wp:featuredmedia"]["0"].caption.rendered}`;
      document.body.style.position = "fixed";
    } else if (
      !event.target.matches("#image") &&
      modal.style.display === "block"
    ) {
      event.preventDefault();
      event.stopPropagation();
      document.body.style.position = "static";
      modal.style.display = "none";
    }
  }

  document.addEventListener("click", openModal);
}
