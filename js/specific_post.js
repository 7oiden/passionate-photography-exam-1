//fetch specific post
const currentBreadcrumb = document.querySelector(".current");
const postContainer = document.querySelector(".post-container");
const postImage = document.querySelector(".post-image");
const postHeading = document.querySelector("h2");
const contentText = document.querySelector(".post-text");
const modal = document.querySelector(".modal");
const modalImage = document.querySelector("#image");
const captionText = document.querySelector("#caption");

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

console.log(queryString);

const id = params.get("id");

const embed = "?_embed";

specificPostUrl =
  "http://7oiden.com/passionate-photography/wp-json/wp/v2/posts/" + id + embed;

const corsFixSpecific = "https://noroffcors.herokuapp.com/" + specificPostUrl;

async function fetchSpecific() {
  try {
    const response = await fetch(corsFixSpecific);
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
  replies = details._embedded.replies;

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

  const commentIcon = `<svg class="comment-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4l0 0 0 0 0 0 0 0 .3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z"/></svg>`;

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

// console.log(commentUrl);

async function fetchComments() {
  try {
    const response = await fetch(corsFixComments);
    const comments = await response.json();

    // console.log(comments);
    // console.log(comments.length);

    commentWrapper.innerHTML = "";

    if (comments.length === 0) {
      commentWrapper.innerHTML = `<div class="comment-container"><span>No comments yet, but feel free to leave one!</span></div>`;
    } else {
      for (let i = 0; i < comments.length; i++) {
        let initialDate = comments[i].date;
        let formattedDate = new Date(initialDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });

        commentWrapper.innerHTML += `
       <div class="comment-container">
       <figure class="comment-image"><img id="myimg" class="comment-image" src="${comments[i].author_avatar_urls[96]}" alt="image of a generic avatar"/> </figure>
       <div>
       <span id="comment-author">${comments[i].author_name}</span>
       <div class="info-container"><span>${formattedDate}</span></div>
       <div id="comment-text">${comments[i].content.rendered}</div>
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
    commentNameError.style.display = "none";
  } else {
    commentNameError.style.display = "block";
  }
  if (validateEmail(commentEmail.value)) {
    commentEmailError.style.display = "none";
  } else {
    commentEmailError.style.display = "block";
  }
  if (checkLength(comment.value, 4)) {
    commentError.style.display = "none";
  } else {
    commentError.style.display = "block";
  }
}

name.addEventListener("keyup", checkCommentInput);
commentEmail.addEventListener("keyup", checkCommentInput);
comment.addEventListener("keyup", checkCommentInput);

function validateCommentForm(event) {
  event.preventDefault();

  if (checkLength(name.value, 2)) {
    commentNameError.style.display = "none";
  } else {
    commentNameError.style.display = "block";
  }
  if (validateEmail(commentEmail.value)) {
    commentEmailError.style.display = "none";
  } else {
    commentEmailError.style.display = "block";
  }
  if (checkLength(comment.value, 4)) {
    commentError.style.display = "none";
  } else {
    commentError.style.display = "block";
  }
  if (
    checkLength(name.value, 2) &&
    validateEmail(commentEmail.value) &&
    checkLength(comment.value, 4)
  ) {
    commentSent.innerHTML = `
    <p id="success-message"><strong>Thank you for your comment!</strong> 
    The comment is sent for approval, and will normally appear within a day.</p>`;

    commentForm.reset();

    setTimeout(function () {
      commentSent.innerHTML = "";
    }, 3000);
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
