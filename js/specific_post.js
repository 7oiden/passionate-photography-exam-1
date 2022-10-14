import { baseUrl } from "./settings/api.js";

//fetch specific post
const currentBreadcrumb = document.querySelector(".active");
const postContainer = document.querySelector(".post-container");
// const postImage = document.querySelector(".post-image");
// const postHeading = document.querySelector("h2");
// const contentText = document.querySelector(".post-text");
const modal = document.querySelector(".modal");
const modalImage = document.querySelector("#image");
const captionText = document.querySelector("#caption");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const embed = "?_embed";

// console.log(queryString);

const specificPostUrl = baseUrl + id + embed;

// const corsFixSpecific = "https://noroffcors.herokuapp.com/" + specificPostUrl;

async function fetchSpecific() {
  try {
    const response = await fetch(specificPostUrl);
    const details = await response.json();

    console.log(details);

    document.title = `Passionate Photography | Post-page | ${details.title.rendered}`;

    createHtml(details);
  } catch (error) {
    console.log(error);
    postContainer.innerHTML = displayError(
      "An error has occurred when trying to retrieve the API"
    );
  }
}

fetchSpecific();

function createHtml(details) {
  const replies = details._embedded.replies;

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
        categoryName = "Uncategorized";
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
     <p>${numReplies} comments</p>
     </div>
     <div class="post-text">${details.content.rendered}</div>
 `;

  const head = document.querySelector("header");

  //modal
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

//fetch comments
const commentWrapper = document.querySelector(".comment-wrapper");

const commentUrl =
  "http://7oiden.com/passionate-photography/wp-json/wp/v2/comments?post=" + id;

const corsFixComments = "https://noroffcors.herokuapp.com/" + commentUrl;

console.log(commentUrl);

async function fetchComments() {
  try {
    const response = await fetch(corsFixComments);
    const comments = await response.json();

    console.log(comments);
    console.log(comments.length);

    commentWrapper.innerHTML = "";

    if (comments.length === 0) {
      commentWrapper.innerHTML = `<p class="comments-default">No comments yet - but feel free to leave one!</p>`;
    } else {
      for (let i = 0; i < comments.length; i++) {
        commentWrapper.innerHTML += `
       <div class="comment-container">
       <figure class="comment-image"><img id="myimg" class="comment-image" src="${comments[i].author_avatar_urls[96]}" alt="image of a generic avatar"/> </figure>
       <div>
       <p id="comment-author">${comments[i].author_name}</p>
       <div class="info-container"><p>${comments[i].date}</p></div>
       <p id="comment-text">${comments[i].content.rendered}</p>
       </div>
       </div> `;
      }
    }
  } catch (error) {
    console.log(error);
    postContainer.innerHTML = displayError(
      "An error has occurred when trying to retrieve the API"
    );
  }
}

fetchComments();

// comment form
const commentForm = document.querySelector("#comment-form");
const name = document.querySelector("#name");
const commentEmail = document.querySelector("#comment-email");
const comment = document.querySelector("#comment-textarea");
const commentNameError = document.querySelector("#comment-name-error");
const commentEmailError = document.querySelector("#comment-email-error");
const commentError = document.querySelector("#comment-error");
const commentButton = document.querySelector("#comment-button");
const commentSent = document.querySelector(".comment-sent");

function checkCommentInput() {
  if (checkLength(name.value, 2)) {
    commentNameError.style.visibility = "hidden";
  } else {
    commentNameError.style.visibility = "visible";
  }
  if (validateEmail(commentEmail.value)) {
    commentEmailError.style.visibility = "hidden";
  } else {
    commentEmailError.style.visibility = "visible";
  }
  if (checkLength(comment.value, 4)) {
    commentError.style.visibility = "hidden";
  } else {
    commentError.style.visibility = "visible";
  }
}

name.addEventListener("keyup", checkCommentInput);
commentEmail.addEventListener("keyup", checkCommentInput);
comment.addEventListener("keyup", checkCommentInput);

function validateCommentForm(event) {
  event.preventDefault();

  if (checkLength(name.value, 2)) {
    commentNameError.style.visibility = "hidden";
  } else {
    commentNameError.style.visibility = "visible";
  }
  if (validateEmail(commentEmail.value)) {
    commentEmailError.style.visibility = "hidden";
  } else {
    commentEmailError.style.visibility = "visible";
  }
  if (checkLength(comment.value, 4)) {
    commentError.style.visibility = "hidden";
  } else {
    commentError.style.visibility = "visible";
  }
  if (
    checkLength(name.value, 2) &&
    validateEmail(commentEmail.value) &&
    checkLength(comment.value, 4)
  ) {
    commentSent.innerHTML = `
    <p id="success-message"><strong>Thank you for your comment!</strong> 
    The comment is sent for approval, and will normally appear within a day.</p>`;
  }
}

commentForm.addEventListener("submit", validateCommentForm);

function checkLength(value, len) {
  if (value.trim().length > len) {
    return true;
  } else {
    return false;
  }
}

function validateEmail(contactEmail) {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(contactEmail);
  return patternMatches;
}
